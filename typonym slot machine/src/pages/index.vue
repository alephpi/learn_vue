<script lang="ts"></script>

<!-- eslint-disable @typescript-eslint/consistent-type-definitions -->
<!-- eslint-disable no-alert -->
<!-- eslint-disable no-undef-init -->
<!-- eslint-disable prefer-const -->
<script setup lang="ts">
const name = $ref('')
const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
}
</script>
