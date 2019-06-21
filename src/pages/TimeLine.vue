<template>
  <q-page padding>
    <div class="q-px-lg q-pb-md">
      <q-timeline color="white">
        <q-timeline-entry heading>
          November, 2017
        </q-timeline-entry>

        <q-timeline-entry
                title="Event Title"
                :subtitle="$q.subtitle = $auth.currentUser.email"
                avatar="https://cdn.quasar.dev/img/avatar2.jpg"
        >
          <div>
            {{$auth.currentUser.email}}
          </div>
        </q-timeline-entry>

        <q-timeline-entry heading>
          November, 2017
        </q-timeline-entry>

        <q-timeline-entry
                title="Event Title"
                :subtitle="$q.subtitle = $auth.currentUser.email"
                avatar="https://cdn.quasar.dev/img/avatar2.jpg"
        >
          <div>
            {{$auth.currentUser.email}}
          </div>
        </q-timeline-entry>

        <q-timeline-entry heading>
          November, 2017
        </q-timeline-entry>

        <q-timeline-entry
                title="Event Title"
                :subtitle="$q.subtitle = $auth.currentUser.email"
                avatar="https://cdn.quasar.dev/img/avatar2.jpg"
        >
          <div>
            {{$auth.currentUser.email}}
          </div>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>

<style>
</style>
