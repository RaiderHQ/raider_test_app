import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

export default function WebViewScreen() {
  const [url, setUrl] = useState('https://github.com/RubyRaider');
  const [visitedUrls, setVisitedUrls] = useState<string[]>([]);

  const handleGo = () => {
    if (!url.trim()) {
      return;
    }
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    setVisitedUrls(prev => [fullUrl, ...prev]);
    Linking.openURL(fullUrl);
  };

  return (
    <View testID="webview-screen" style={styles.container}>
      <Text style={styles.title}>Web Browser</Text>

      <View style={styles.urlBar}>
        <TextInput
          testID="url-input"
          style={styles.urlInput}
          placeholder="Enter URL"
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
          keyboardType="url"
          accessibilityLabel="URL input"
        />
        <TouchableOpacity
          testID="go-button"
          style={styles.goButton}
          onPress={handleGo}>
          <Text style={styles.goText}>Go</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Recent URLs</Text>
        {visitedUrls.length === 0 ? (
          <Text testID="no-history" style={styles.emptyText}>
            No URLs visited yet
          </Text>
        ) : (
          visitedUrls.map((visitedUrl, index) => (
            <TouchableOpacity
              key={index}
              testID={`history-item-${index}`}
              style={styles.historyItem}
              onPress={() => {
                setUrl(visitedUrl);
                Linking.openURL(visitedUrl);
              }}>
              <Text style={styles.historyUrl} numberOfLines={1}>
                {visitedUrl}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 20},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 16},
  urlBar: {flexDirection: 'row', gap: 8, marginBottom: 24},
  urlInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  goButton: {
    backgroundColor: '#E2231A',
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
  },
  goText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  historySection: {flex: 1},
  historyTitle: {fontSize: 18, fontWeight: '600', marginBottom: 12},
  emptyText: {color: '#999', fontSize: 14},
  historyItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  historyUrl: {fontSize: 14, color: '#0066CC'},
});
