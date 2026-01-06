import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MessageBubbleProps {
  content: string;
  isMyMessage: boolean;
  timestamp: string;
}

export const MessageBubble = ({ content, isMyMessage, timestamp }: MessageBubbleProps) => {
  return (
    <View style={[
      styles.container,
      isMyMessage ? styles.myMessage : styles.theirMessage
    ]}>
      <Text style={[
        styles.text,
        isMyMessage ? styles.myText : styles.theirText
      ]}>
        {content}
      </Text>
      <Text style={[
        styles.time,
        isMyMessage ? styles.myTime : styles.theirTime
      ]}>
        {timestamp}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2563eb', // blue-600
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e2e8f0', // slate-200
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  myText: {
    color: '#ffffff',
  },
  theirText: {
    color: '#1e293b',
  },
  time: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  myTime: {
    color: '#bfdbfe',
  },
  theirTime: {
    color: '#64748b',
  },
});
