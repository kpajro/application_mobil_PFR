import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function CategoryProductsScreen() {
    const { id, nom } = useLocalSearchParams<{ id: string; nom: string }>();
    const router = useRouter();

    const [produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchProduits = async () => {
        try {
            const res = await fetch(`http://172.26.69.134:8080/api/categories/${id}`);
            const data = await res.json();
            setProduits(data.produits || []);
        } catch (err) {
            console.error('Erreur:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchProduits();
    }, [id]);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        fetchProduits();
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Produits de la catégorie "{nom}"</Text>
            <FlatList
                data={produits}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: '/(tabs)/product/[id]',
                                params: { id: item.id },
                            })
                        }
                    >
                        <View style={styles.card}>
                            <Text style={styles.productName}>{item.nom}</Text>
                            <Text style={item.stock > 0 || !item.isLimitedStock ? styles.inStock : styles.outOfStock}>
                                {item.stock > 0 || !item.isLimitedStock ? 'En stock' : 'Stock épuisé'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}

            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    card: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f3f4f6',
        marginBottom: 12,
    },
    productName: {
        fontSize: 16,
    },
    inStock: {
        color: 'green',
        fontWeight: '600',
        marginTop: 4,
    },
    outOfStock: {
        color: 'red',
        fontWeight: '600',
        marginTop: 4,
    },

});
