import { Platform, Linking } from 'react-native';

export default function makeCall(phoneNumber) {
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${phoneNumber}`;
  } else {
    phoneNumber = `telprompt:${phoneNumber}`;
  }

  Linking.openURL(phoneNumber).then((supported) => {
    if (supported) {
      return Linking.openURL(url).catch(() => null);
    }
  });
}
