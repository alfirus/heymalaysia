import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { io, Socket } from 'socket.io-client';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { MessageBubble } from '../../components/chat/MessageBubble';
import { Send } from 'lucide-react-native';

// Hack for MVP: Mock user IDs
const MOCK_MY_ID = 'user_123';
const MOCK_THEIR_ID = 'admin_001';

// Should be from env/config, matching backend URL (important for localhost on device)
// Using generic localhost for now, needs update for real device
import { Platform as RNPlatform } from 'react-native';
const SERVER_URL = RNPlatform.select({
  android: 'http://10.0.2.2:5555',
  ios: 'http://localhost:5555',
  default: 'http://localhost:5555',
});

interface Message {
  _id?: string;
  senderId: string;
  content: string;
  timestamp: string;
}

export default function ChatScreen({ route, navigation }: any) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Initialize Socket
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    // Join room
    newSocket.emit('join', MOCK_MY_ID);

    // Listen for messages
    newSocket.on('receive_message', (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    });

    newSocket.on('message_sent', (msg: any) => {
       // Ideally we optimistic update, but backend confirmation is nice too
       // Check if we already added it (optimistic) or just rely on this
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSend = () => {
    if (!inputText.trim() || !socket) return;

    const msgData = {
      senderId: MOCK_MY_ID,
      receiverId: MOCK_THEIR_ID,
      content: inputText.trim(),
    };

    // Optimistic UI update
    const optimisticMsg: Message = {
      senderId: MOCK_MY_ID,
      content: inputText.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMsg]);
    
    // Emit event
    socket.emit('send_message', msgData);
    
    setInputText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button 
            title="Back" 
            variant="ghost" 
            onPress={() => navigation.goBack()} 
            style={{ width: 80, paddingHorizontal: 0 }}
        />
        <Text style={styles.headerTitle}>Admin Support</Text>
        <View style={{ width: 80 }} /> 
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <MessageBubble
            content={item.content}
            isMyMessage={item.senderId === MOCK_MY_ID}
            timestamp={new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          />
        )}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <View style={styles.inputContainer}>
          <Input
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            style={styles.input}
          />
          <Button
            title="Send"
            onPress={handleSend}
            style={styles.sendButton}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    alignItems: 'center', // Align items vertically
  },
  input: {
    flex: 1,
    marginBottom: 0, // Override default Input margin
    marginRight: 8,
  },
  sendButton: {
    width: 80,
    height: 48, // Match input height roughly
  },
});
