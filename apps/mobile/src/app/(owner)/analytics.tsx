import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'

export default function Analytics() {
    // Replace this with your actual sign-out logic
    const handleLogout = () => {
        console.log('Logging out...')
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="flex-1 justify-between px-6 py-8">

                {/* Top Header */}
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                            Owner Portal
                        </Text>
                        <Text className="text-white text-2xl font-bold mt-1">
                            Dashboard
                        </Text>
                    </View>

                    {/* Active Status Indicator */}
                    <View className="flex-row items-center bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                        <View className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                        <Text className="text-emerald-400 text-xs font-medium">Authenticated</Text>
                    </View>
                </View>

                {/* Center Coming Soon Card */}
                <View className="items-center justify-center py-12 px-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
                    {/* Decorative Icon Placeholder */}
                    <View className="w-16 h-16 bg-indigo-500/10 rounded-2xl items-center justify-center mb-6 border border-indigo-500/20">
                        <Text className="text-3xl">🚀</Text>
                    </View>

                    <Text className="text-white text-2xl font-bold text-center tracking-tight">
                        Coming Soon
                    </Text>

                    <Text className="text-slate-400 text-sm text-center mt-3 leading-relaxed max-w-xs">
                        We are setting up your personalized workspace. Your complete owner control panel will be live right here shortly.
                    </Text>
                </View>

                {/* Bottom Actions / Logout for Testing */}
                <View className="gap-4">
                    <TouchableOpacity
                        onPress={handleLogout}
                        activeOpacity={0.7}
                        className="w-full bg-slate-900 border border-slate-800 py-4 rounded-2xl items-center justify-center active:bg-slate-800"
                    >
                        <Text className="text-rose-400 font-semibold text-base">
                            Sign Out
                        </Text>
                    </TouchableOpacity>

                    <Text className="text-center text-xs text-slate-600">
                        App Version 1.0.0
                    </Text>
                </View>

            </View>
        </SafeAreaView>
    )
}