import { Text, Pressable, StyleSheet, View } from 'react-native';

export default function Button(props) {
    const { onPress, title, style } = props;

    return (
        <View>
            <Pressable style={ style } onPress={ onPress }>
                <Text style={ styles.textDecoration }>{ title }</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    textDecoration: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        textTransform: 'uppercase',
    }
})