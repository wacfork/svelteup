<svelte:options tag="temperature-app" />

<script>
  let c = 0;
  let f = 32;

  function setBothFromC(value) {
    c = +value;
    f = +(32 + (9 / 5) * c).toFixed(1);
  }

  function setBothFromF(value) {
    f = +value;
    c = +((5 / 9) * (f - 32)).toFixed(1);
  }
</script>

<!-- https://eugenkiss.github.io/7guis/tasks/#temp -->
<input value={c} on:input={(e) => setBothFromC(e.target.value)} type="number" />
°c =
<input value={f} on:input={(e) => setBothFromF(e.target.value)} type="number" />
°f

<style>
  input {
    width: 5em;
  }
</style>
