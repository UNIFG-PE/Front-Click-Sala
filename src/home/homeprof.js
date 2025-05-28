
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function PaginaProfessor({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity   onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../assets/2849812_menu_multimedia_bars_media_icon.png')}
            style={styles.icone}
           
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Click Sala!</Text>
<View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Card do Professor</Text>
        <Text style={styles.desc}>Conteúdo do card aqui</Text>
      </View>

     
      <View style={styles.card}>
        <Text style={styles.title}>Outro Card</Text>
        <Text style={styles.desc}>Informação adicional</Text>
      </View>
    </View>
     
      </View>

      <View style={styles.content}>
        <Text>Olá, professor fulano</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#232455',
    padding: 10,
  },

  headerTitle: {
    fontSize: 29,
    color: '#fff',
    flexDirection: 'row',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center', 
    marginTop: 35,
    marginLeft: 20,
    marginRight:20,
    flex: 1,
  },

  nav: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },

  navLink: {
    color: '#fff',
    marginHorizontal: 10,
  
  },
  content: {
    fontSize: 3,
    flex: 1,
    padding: 20,
    
  },

  icone: {
    width: 59,
    height: 65,
    marginRight: 10,
    marginLeft: 0,
    marginTop: 0,

  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'absolute',
    top: 200, 
  },
  
    title:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

});




