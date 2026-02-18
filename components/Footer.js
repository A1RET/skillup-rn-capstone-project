import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { icons, COLORS, FONT, SIZES } from "../constants";

const Footer = ({ data }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const checkIfFavorite = async () => {
        try {
            const favorites = await AsyncStorage.getItem("favorites");
            const favoritesArray = favorites ? JSON.parse(favorites) : [];
            const isFav = favoritesArray.some((item) => item.id === data.id);
            setIsFavorite(isFav);
        } catch (error) {
            console.error("Failed to fetch favorites", error);
        }
    };

    useEffect(() => {
        checkIfFavorite();
    }, []);

    const handleFavoriteToggle = async () => {
        try {
            let favorites = await AsyncStorage.getItem("favorites");
            favorites = favorites ? JSON.parse(favorites) : [];

            const updatedFavorites = isFavorite
                ? favorites.filter((item) => item.id !== data.id)
                : [...favorites, data];

            await AsyncStorage.setItem(
                "favorites",
                JSON.stringify(updatedFavorites),
            );
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Failed to update favorites", error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.likeBtn}
                onPress={handleFavoriteToggle}
            >
                <Image
                    source={isFavorite ? icons.heartFilled : icons.heartOutline}
                    resizeMode="contain"
                    style={[
                        styles.likeBtnImage,
                        { tintColor: isFavorite ? "red" : "#F37453" },
                    ]}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.applyBtn}
                onPress={handleFavoriteToggle}
            >
                <Text style={styles.applyBtnText}>
                    {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: SIZES.small,
        backgroundColor: "#FFF",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    likeBtn: {
        width: 55,
        height: 55,
        borderWidth: 1,
        borderColor: "#F37453",
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    likeBtnImage: {
        width: "40%",
        height: "40%",
        tintColor: "#F37453",
    },
    applyBtn: {
        flex: 1,
        backgroundColor: "#FE7654",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: SIZES.medium,
        borderRadius: SIZES.medium,
    },
    applyBtnText: {
        fontSize: SIZES.medium,
        color: COLORS.white,
        fontFamily: FONT.bold,
        padding: SIZES.small,
    },
});

export default Footer;
