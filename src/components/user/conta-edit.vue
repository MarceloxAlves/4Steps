<template>
  <div class="q-pa-md q-gutter-sm" >
    <q-btn label="Alterar Conta"  flat color="primary" @click="icon = true" />
    <q-dialog v-model="icon">
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">Alterar conta</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-form
            @submit="updateUser"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="user.nome"
              type="text"
              label="Nome *"
              hint="Digite seu Nome"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Digite seu Nome']"
            />
            <q-input
              filled
              v-model="user.imagem"
              type="file"
              label=""
              hint="Upload de uma imagem"
              @change="onFileChange"
            />
            <q-linear-progress dark style="height: 5px" :value="fileprogress" color="green" />
            <div class="col-sm-12">
              <q-btn style="width: 100%" label="Salvar alterações" type="submit" color="primary"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'ContaEdit',
  props: ['contaEditOpen'],
  data: function () {
    return {
      user: {
        nome: '',
        imagem: ''
      },
      filedata: '',
      fileprogress: 0.0,
      icon: false
    }
  },
  created () {
    if (this.$auth.currentUser != null) {
      this.user.nome = this.$auth.currentUser.displayName
    }
  },
  methods: {
    onFileChange (event) {
      this.filedata = event.target.files[0]
    },
    upload () {
      var app = this
      if (this.user.imagem) {
        var storageRef = this.$storage.ref()
        var uploadTask = storageRef.child('/perfil/' + this.filedata.name).put(this.filedata)
        uploadTask.on('state_changed', function (snapshot) {
          app.fileprogress = (snapshot.bytesTransferred / snapshot.totalBytes)
        }, function (error) {
          app.$q.loading.hide()
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break

            case 'storage/canceled':
              app.erroShow('Usuário cancelou o Storage')
              break
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break
          }
        }, function () {
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            app.salvar({ displayName: app.user.nome, photoURL: downloadURL })
          })
        })
      }
    },
    updateUser () {
      this.$q.loading.show()
      if (this.user.imagem) {
        this.upload()
      } else {
        this.salvar({ displayName: this.user.nome })
      }
    },
    salvar (payload) {
      let user = this.$auth.currentUser
      var app = this
      if (user) {
        user.updateProfile(payload).then(function () {
          app.successShow('Alterações salva com sucesso')
          app.$q.loading.hide()
        }).catch((err) => {
          app.erroShow(err.message)
          app.$q.loading.hide()
        })
      }
    },

    erroShow (erro) {
      this.$q.notify({
        color: 'negative',
        position: 'bottom-right',
        message: erro,
        timeout: 2500,
        textColor: 'white',
        actions: [{ icon: 'close', color: 'white' }]
      })
    },
    successShow (msg) {
      this.$q.notify({
        color: 'positive',
        position: 'bottom-right',
        message: msg,
        timeout: 2500,
        textColor: 'white',
        actions: [{ icon: 'close', color: 'white' }]
      })
    }

  }
}
</script>

<style>
  .q-gutter-md{
    background-color: white;
    padding: 10%;
    z-index: 3000;
  }
  .link-nova{
    cursor: pointer;
    color: #0747A6;
  }
</style>
