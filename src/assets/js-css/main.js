// 
// 
// Main styles for app
const colors = {
    burgundy: '#800020',
    faded_black: '#000000c9'
}

const fonts = {
    default: "'Kreon', serif"
}

export default {
    // Position
    fixed_top_left_cover: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
    },
    // Flex
    flex_column_center: {
        display: 'flex',
        flexColumn: 'column',
        justifyContent: 'center'
    },
    flex_absolute_center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBackground: {
        backgroundColor: colors.faded_black
    },
    // Transitions

    // Borders

    // Backgrounds

    // Colors
    colors: colors,
    // Fonts
    fonts: fonts,
    header: {
        fontFamily: fonts.default,
        fontSize: '2.25rem'
    },
    par: {
        fontFamily: fonts.default,
        fontSize: '1.25rem'
    }
}