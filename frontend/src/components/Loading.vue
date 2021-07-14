<template>
    <div id="loading">
        <img id="loadingImg" src="./../assets/soccer.png"> Loading...
    </div>
</template>

<script>
export default {
    name: "Loading",
}

</script>

<style>
#loading{
    text-align: center;
    /* background-color: rgb(216, 238, 201,0.9); */
    width: 100%;
    display: block;
    top: 50%;
    left: 50%;
    color: white;
}

#loadingImg{
    width: 60px;
    height: 60px;
    animation-name: rotate;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    border-radius: 50%;
}

@keyframes rotate{
    from{ transform: rotate(-360deg); }
    to{ transform: rotate(360deg); }
}
</style>