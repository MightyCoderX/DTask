<template>
    <div class="text" @keydown="updateValue">
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
                const temp = document.createElement('div');
                temp.innerHTML = e.target.innerHTML;
                console.log(e.target, temp, temp.innerText);
                this.value = temp.innerText;
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
                    console.log(val);
                    this.$emit('update:modelValue', val);
                }
            }
        }
    }
</script>