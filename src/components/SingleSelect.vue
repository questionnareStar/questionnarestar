<template>
    <div>
        <h3>*<span>{{no}}</span>.<span>{{question}}</span></h3>
        <p>{{description}}</p>
    </div>
</template>

<script>
export default {
    props: ['question', 'description', 'choices', 'needs', 'no']
}
</script>