import { View, Text, StyleSheet } from "react-native";

import { COLORS, SIZES } from "../constants";

const getThemeStyles = (isDark) => ({
    text: {
        color: isDark ? COLORS.darkText : COLORS.lightWhite,
    },
});

const About = ({ info, title, isDarkMode }) => {
    const themeStyles = getThemeStyles(isDarkMode);

    return (
        <View style={styles.container}>
            <Text style={[styles.headText, themeStyles.text]}>
                About {title}:
            </Text>

            <View style={styles.contentBox}>
                <Text style={[styles.contextText, themeStyles.text]}>
                    {info}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    contextText: {
        textAlign: "justify",
    },
});

export default About;
