import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Send, Sparkles, MessageSquare } from 'lucide-react-native';
import { theme } from '../theme/colors';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'aura';
  timestamp: string;
}

export const AssistantScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I am Aura, your Gemini-powered shopping assistant. ✨\n\nHow can I help you discover premium products today? Feel free to ask about categories, product recommendations, or store discounts!",
      sender: 'aura',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Scroll to bottom on new messages
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isTyping]);

  const handleSend = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const auraResponse = generateResponse(textToSend);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: auraResponse,
        sender: 'aura',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('discount') || q.includes('coupon') || q.includes('promo') || q.includes('sale') || q.includes('code')) {
      return "Exclusive offers for you! 🌟\n\n1. Use code 'GEMINI' at checkout to receive an instant 15% discount on all premium collections.\n2. Or use code 'EXPO' for a 10% discount.\n\nJust enter it in your Cart summary before checking out!";
    }

    if (q.includes('fragrance') || q.includes('perfume') || q.includes('smell') || q.includes('cologne')) {
      return "Indulge in our elite fragrance selection. 🌹\n\nWe feature timeless classics such as:\n- Chanel Coco Mademoiselle\n- Calvin Klein CK One\n\nYou can search 'fragrances' in the Catalog to browse prices and add them to your cart.";
    }

    if (q.includes('makeup') || q.includes('beauty') || q.includes('lipstick') || q.includes('eyeshadow') || q.includes('cosmetic')) {
      return "Enhance your aura with our finest beauty choices! 💄\n\nHighly popular choices:\n- Eyeshadow Palette with 12 shades\n- Essence Mascara Lash Princess\n- Powder Blush-on\n\nThese products are vegan, high-pigment, and currently trending. Find them under the 'beauty' category.";
    }

    if (q.includes('chair') || q.includes('sofa') || q.includes('furniture') || q.includes('table') || q.includes('couch')) {
      return "Craft the perfect space with luxury furniture. 🛋️\n\nFeatured listings:\n- Knoll Saarinen Womb Chair (mid-century classic)\n- Velvet Chesterfield Sofa (timeless luxury)\n\nSearch 'furniture' in our Catalog for details and free shipping eligibility on items over $150!";
    }

    if (q.includes('grocery') || q.includes('food') || q.includes('honey') || q.includes('fruit')) {
      return "Check out our organic grocery collection. 🍯\n\nFresh selections:\n- Pure Honey Jar\n- Kiwi Fruit & Organic Lemons\n\nExplore them under the 'groceries' category filter.";
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('aura')) {
      return "Hello! I am ready to guide you. Ask me to recommend makeup, furniture, fragrances, or reveal special discount coupons!";
    }

    if (q.includes('thank') || q.includes('awesome') || q.includes('cool')) {
      return "You are very welcome! It's my pleasure to help. Let me know if you need anything else to perfect your cart. 🛍️";
    }

    return "That sounds like a wonderful request! 🛍️\n\nWhile I continue to learn, I can help you with:\n- Special Coupons ('discount')\n- Beauty recommendations ('makeup')\n- Fragrance classics ('perfumes')\n- Home design styles ('furniture')\n\nWhat would you like to explore next?";
  };

  const suggestions = [
    '🎟️ Get Promo Code',
    '💄 Suggest Beauty',
    '🛋️ Recommend Furniture',
    '🌹 Luxury Fragrances',
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarGlow}>
          <Sparkles size={18} color={theme.colors.black} />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Aura Assistant</Text>
          <Text style={styles.headerSubtitle}>Powered by Gemini AI</Text>
        </View>
      </View>

      {/* Suggested Quick Triggers */}
      <View style={styles.suggestionRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionScroll}>
          {suggestions.map((suggestion, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.7}
              style={styles.suggestionChip}
              onPress={() => handleSend(suggestion.substring(3))}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Messages Window */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => {
            const isAura = msg.sender === 'aura';
            return (
              <View key={msg.id} style={[styles.messageRow, isAura ? styles.auraRow : styles.userRow]}>
                {isAura && (
                  <View style={styles.chatAvatar}>
                    <MessageSquare size={12} color={theme.colors.primary} />
                  </View>
                )}
                <View style={[styles.bubble, isAura ? styles.auraBubble : styles.userBubble]}>
                  <Text style={[styles.bubbleText, isAura ? styles.auraText : styles.userText]}>
                    {msg.text}
                  </Text>
                  <Text style={styles.timestamp}>{msg.timestamp}</Text>
                </View>
              </View>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <View style={[styles.messageRow, styles.auraRow]}>
              <View style={styles.chatAvatar}>
                <MessageSquare size={12} color={theme.colors.primary} />
              </View>
              <View style={[styles.bubble, styles.auraBubble, styles.typingBubble]}>
                <ActivityIndicator size="small" color={theme.colors.primary} />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask Aura anything..."
            placeholderTextColor={theme.colors.textMuted}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => handleSend()}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.sendButton}
            onPress={() => handleSend()}
          >
            <Send size={16} color={theme.colors.black} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  avatarGlow: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
  },
  headerInfo: {
    marginLeft: theme.spacing.md,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  headerSubtitle: {
    fontSize: 11,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  suggestionRow: {
    paddingVertical: theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderBottomWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  suggestionScroll: {
    paddingHorizontal: theme.spacing.md,
  },
  suggestionChip: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
  },
  suggestionText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '500',
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    maxWidth: '85%',
  },
  auraRow: {
    alignSelf: 'flex-start',
  },
  userRow: {
    alignSelf: 'flex-end',
  },
  chatAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
    marginTop: 4,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  bubble: {
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    position: 'relative',
  },
  auraBubble: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    borderTopLeftRadius: 0,
  },
  userBubble: {
    backgroundColor: theme.colors.primary,
    borderTopRightRadius: 0,
  },
  typingBubble: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 20,
  },
  auraText: {
    color: theme.colors.text,
  },
  userText: {
    color: theme.colors.black,
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.4)',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderColor: theme.colors.cardBorder,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.lg,
    color: theme.colors.text,
    fontSize: 14,
    height: 44,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
  },
});
export default AssistantScreen;
