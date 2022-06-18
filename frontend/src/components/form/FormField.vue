<template>
    <div class="form-field">
        <input 
            class="input" 
            :="inputOptions" 
            placeholder=" " 
            v-model="value" 
            v-bind="$attrs.onKeyup"
            :style="'font-size:' + inputFontSize"
        >
        <span class="label">{{ label }}</span>
    </div>
</template>

<script>
    export default {
        props:
        { 
            label: String, 
            inputOptions: Object,
            modelValue: String,
            inputFontSize: String
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

<style scoped>
    .form-field
    {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        position: relative;
        align-self: stretch;
    }

    .form-field .label
    {
        display: block;
        background-color: var(--bg-color);
        position: absolute;
        transform: translateY(-50%);
        left: 1em;
        top: 50%;
        transition: all 0.2s ease;
        pointer-events: none;
        color: #999;
    }

    .form-field:focus-within .label,
    .form-field .input:not(:placeholder-shown) + .label
    {
        padding: 0 0.3em;
        font-size: 0.95em;
        top: 0;
        color: #fff;
    }

    .form-field .input
    {
        background: transparent;
        color: #ddd;
        border: 0.15em solid #999;
        border-radius: 1em;
        padding: 0.8em 0.8em;
        outline: none;
    }

    .form-field .input:not(:placeholder-shown):valid
    {
        border-color: var(--accent-color);
    }

    .form-field .input:not(:placeholder-shown):invalid
    {
        border-color: #ff0000;
    }
</style>