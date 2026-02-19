import React, { useState } from "react";
import {
    TouchableOpacity,
    FlatList,
    Text,
    View,
    StyleSheet,
} from "react-native";

import { COLORS, SHADOWS, SIZES } from "../constants";

const getThemeStyles = (isDark) => ({
    container: {
        backgroundColor: isDark ? COLORS.darkBackground : COLORS.lightWhite,
    },
});

function TabButton({ name, activeTab, onHandleSearchType }) {
    return (
        <TouchableOpacity
            style={styles.btn(name, activeTab)}
            onPress={onHandleSearchType}
        >
            <Text style={styles.btnText(name, activeTab)}>{name}</Text>
        </TouchableOpacity>
    );
}

const Tabs = ({ tabs, activeTab, setActiveTab, isDarkMode }) => {
    const themeStyles = getThemeStyles(isDarkMode);

    return (
        <View style={[styles.container, themeStyles.container]}>
            <FlatList
                data={tabs}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TabButton
                        name={item}
                        activeTab={activeTab}
                        onHandleSearchType={() => setActiveTab(item)}
                    />
                )}
                contentContainerStyle={{ columnGap: SIZES.small / 2 }}
                keyExtractor={(item) => item}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.small,
        marginBottom: SIZES.small / 2,
    },
    btn: (name, activeTab) => ({
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.xLarge,
        backgroundColor: name === activeTab ? COLORS.primary : "#F3F4F8",
        borderRadius: SIZES.medium,
        marginLeft: 2,
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
    }),
    btnText: (name, activeTab) => ({
        fontFamily: "DMMedium",
        fontSize: SIZES.small,
        color: name === activeTab ? "#C3BFCC" : "#AAA9B8",
    }),
});

export default Tabs;
