<template>
    <div class="checkbox">
        <input type="checkbox" class="input" v-model="value">
        <span class="custom-checkbox">
            <Icon class="check" name="check"/>
        </span>
        <span class="label" v-if="label">{{ label }}</span>
    </div>
</template>

<script>
    import Icon from './Icon.vue';

    export default {
        props:
        {
            label: String,
            modelValue: Boolean
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
        },
        components: { Icon }
    }
</script>

<style scoped>
    .checkbox
    {
        min-width: 1.5em;
        min-height: 1.5em;
        position: relative;
        z-index: 1;
        background-color: #222;
        overflow: hidden;
        border-radius: 0.2em;
    }

    .input
    {
        appearance: none;
        position: absolute;
        inset: 0;
    }

    .custom-checkbox
    {
        position: absolute;
        inset: 0;
        pointer-events: none;
        border: 1.5px solid #444;
    }

    .check
    {
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        font-size: 1.5em;
        color: transparent;
        font-weight: 600;
    }

    .input:checked ~ .custom-checkbox .check
    {
        color: var(--accent-color);
    }

</style>
