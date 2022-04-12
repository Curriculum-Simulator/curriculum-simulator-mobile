import { StyleSheet } from 'react-native';

import { Card } from "@rneui/base";
import { FlatList, View } from "react-native";
import { Text } from "./Themed";

export function HomeCard() {
    return (
        <Card containerStyle={styles.card} wrapperStyle={{}}>
            <Card.Image
                style={styles.image}
                resizeMode="contain"
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/fr/thumb/f/f1/Logo-esi.png/1200px-Logo-esi.png' }} />
            <Card.Divider />

            <View style={styles.container}>
                <Text style={styles.title}>École Supérieure d'Informatique</Text>
                <Text style={styles.subtitle}>HE2B - ESI</Text>

                <Text style={styles.text}>
                    L'ESI délivre le grade de BA (Bachelier/Bachelor) en Informatique.
                    La durée des études est de trois ans, et il y a trois sections:
                </Text>
                <FlatList style={styles.list}
                    data={[
                        { key: 'Informatique de gestion' },
                        { key: 'Informatique industrielle' },
                        { key: 'Informatique réseaux et télécom' }
                    ]}
                    renderItem={({ item }) => <Text style={styles.item}>- {item.key}</Text>}
                />
                <Text style={styles.text}>
                    Depuis septembre 2010, l'ESI organise une année de Spécialisation en sécurité des réseaux et systèmes informatiques.
                    Depuis septembre 2016, l'ESI participe au Master en cybersécurité en co-diplômation avec différents partenaires.
                </Text>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: "20%",
        marginBottom: "20%",
        borderRadius: 10,
    },
    image: {
        width: "50%",
        height: 70,
        marginBottom: 15
    },
    container: {
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 17,
        fontWeight: "bold"
    },
    text: {
        fontSize: 15,
        margin: 5
    },
    list: {
        padding: 5
    },
    item: {
        marginLeft: 30,
    },
});