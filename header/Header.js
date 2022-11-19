import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
    const title = 'Astral Navigation';
    const message = 'Search the stars';

    return (
        <View style={ styles.container }>
            <Text style={ styles.titleStyle }>{ title }</Text>
            <Text style={ styles.messageStyle }>{ message }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 100
    },
    titleStyle: {
        color: 'white',
        fontSize: 30
    },
    messageStyle: {
        color: 'white',
        fontSize: 20
    }
})