<template>
    <div class="text" @keydown="updateValue" ref="text">
        {{ value }}
    </div>
</template>

<script>
    export default {
        props:
        {
            modelValue: String
        },
        data()
        {
            return {
                
            }
        },
        methods:
        {
            updateValue(e)
            {
                this.value = e.target.innerText;
            }
        },
        computed:
        {
            value:
            {
                get()
                {
                    return this.modelValue;
                },
                set(val)
                {
                    this.$emit('update:modelValue', val);
                }
            }
        }
    }
</script>