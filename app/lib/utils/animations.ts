// Framer motion animations settings
export const getFilterAnimation = () => ({
    containerAnimation: {
        hidden: { opacity: 0, y: "-50px" },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.03,
                type: 'tween'
            }
        }
    }
})