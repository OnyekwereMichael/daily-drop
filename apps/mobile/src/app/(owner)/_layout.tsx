import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import React from 'react';

export default function OwnerLayout() {
    return (
        <NativeTabs>
            <NativeTabs.Trigger name="index">
                <Label>Orders</Label>
                <Icon sf="shippingbox.fill" md="local_shipping" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="items">
                <Label>Items</Label>
                <Icon sf="menucard.fill" md="restaurant_menu" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="analytics">
                <Label>Analytics</Label>
                <Icon sf="chart.bar.xaxis" md="bar_chart" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="profile">
                <Label>Profile</Label>
                <Icon sf="person.crop.circle.fill" md="account_circle" />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}