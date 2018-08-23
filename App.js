/* @flow */

// testy

import React from "react";
import { Notifications } from "expo";
import { Text, View, Button } from "react-native";

// This refers to the function defined earlier in this guide
import { registerForPushNotificationsAsync } from "./ExpoPush";

export default class App extends React.Component {
  state = {
    notification: {},
    token: undefined
  };

  cos = async () => {
    const token = await registerForPushNotificationsAsync();
    this.setState({ token });
  };
  componentDidMount() {
    this.cos();
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = notification => {
    this.setState({ notification });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Origin: {this.state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
        <Text>Token: {this.state.token}</Text>
        <Button
          title="Click me!"
          color="#841584"
          onPress={() => this.setState({ notification: {} })}
        />
      </View>
    );
  }
}
