<template>
    <svg :class="`u-icon u-icon-${name}`" :viewBox="viewbox" role="img">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`${url}#${name}`"></use>
    </svg>
</template>

<script>
export default {
    props: {
        viewbox: String,
        name: String,
        url: {
            type: String,
            default: `http://${window.location.host}/svg/sprite.svg`
        },
        className: {
            type: String
        }
    }
};
</script>
