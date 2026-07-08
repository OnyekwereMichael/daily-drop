import { useQuery } from "@tanstack/react-query"
import { HealthCheckResponse } from "@daily-drop/types"
import { api } from "@/lib/axios"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"

export default function HomeScreen() {
    const { data: health, error, isLoading } = useQuery<HealthCheckResponse>({
        queryKey: ['health'],
        queryFn: () => api.get<HealthCheckResponse>('/health').then(res => res.data)
    })

    console.log('health', health);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Daily Drop</Text>
            <Text style={styles.subtitle}>Your daily source for fresh produce</Text>

            {isLoading && <ActivityIndicator size={"large"} color={"blue"} />}

            {error && <Text>Error: {error.message}</Text>}

            {health
                && <View>
                    <Text>Status: {health.status}</Text>
                    <Text>Timestamp: {new Date(health.timestamp).toDateString()}</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FCFCFD",
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: "400",
        color: "#6B7280",
    }
})
