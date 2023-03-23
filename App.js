import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-web';
import { TouchableOpacity } from 'react-native-web';


export default function App() {
  //definimos las variables del modulo de notas
  const [identificacion, setidentificacion] = useState('');
  const [nombres, setnombres] = useState('');
  const [asignatura, setasignatura] = useState('');
  const [nota1, setnota1] = useState(0);
  const [nota2, setnota2] = useState(0);
  const [nota3, setnota3] = useState(0);
  const [definitiva, setdefinitiva] = useState(0);
  const [observacion, setobservacion] = useState('');
  const [arrguadar, setguardar] = useState([]); //utilizamos el hook de Usestate para hacer un arreglo de objetos vacio, el cual nos va aguardar el contenido digitado

  const guardar = () => {
    let result = 0;
    let observ = '';
    if (identificacion !== '') {
      if (nombres !== '') {
        if (asignatura !== '') {
          if (
            nota1 >= 0 &&
            nota1 <= 5 &&
            nota2 >= 0 &&
            nota2 <= 5 &&
            nota3 >= 0 &&
            nota3 <= 5
          ) {
            result =
              (parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3)) / 3;

            if (result >= 3) {
              observ = 'Aprobo';
            } else if (result > 2 && result <= 2.94) {
              observ = 'Habilita';
            } else {
              observ = 'Reprueba';
            }
          } else {
            alert('Digite correctamente las notas');
          }
        } else {
          alert('la asignatura es obligatoria');
        }
      } else {
        alert('El nombre es obligatorio');
      }
    } else {
      alert('La identificacion es requerida');
    }

    setguardar((arrguadar) => [
      ...arrguadar,
      {
        identificacion,
        nombres,
        asignatura,
        nota1,
        nota2,
        nota3,
        definitiva: result,
        observacion: observ,
      },
    ]);
    setdefinitiva(result);
    setobservacion(observ);
  };

  const limpiar = () => {
    setidentificacion('');
    setnombres('');
    setasignatura('');
    setnota1(0);
    setnota2(0);
    setnota3(0);
    setdefinitiva(0);
    setobservacion('');
  };

  const buscar = (id) => {
    let search = arrguadar.find(
      (estud) => estud.identificacion == identificacion
    );
    if (search !== undefined) {
      setidentificacion(search.identificacion);
      setnombres(search.nombres);
      setasignatura(search.asignatura);
      setnota1(search.nota1);
      setnota2(search.nota2);
      setnota3(search.nota3);
      setdefinitiva(search.definitiva);
      setidentificacion(search.identificacion);
      setobservacion(search.observacion);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Sistemas de Notas</Text>
      </View>
      <View>
        <View style={styles.body}>
          <Text>Identificacion</Text>
          <TextInput
            onChange={(e) => setidentificacion(e.target.value)}
            value={identificacion}
            style={styles.buttons}
          />
        </View>
        <View style={styles.body}>
          <Text>Nombres</Text>
          <TextInput
            onChange={(e) => setnombres(e.target.value)}
            style={styles.buttons}
            value={nombres}
          />
        </View>
        <View style={styles.body}>
          <Text>Asignatura</Text>
          <TextInput
            onChange={(e) => setasignatura(e.target.value)}
            style={styles.buttons}
            value={asignatura}
          />
        </View>
        <View style={styles.body}>
          <Text>Nota 1</Text>
          <TextInput
            onChange={(e) => setnota1(e.target.value)}
            value={nota1}
            style={styles.buttons}
          />
        </View>
        <View style={styles.body}>
          <Text>Nota 2</Text>
          <TextInput
            onChange={(e) => setnota2(e.target.value)}
            value={nota2}
            style={styles.buttons}
          />
        </View>
        <View style={styles.body}>
          <Text>Nota 3</Text>
          <TextInput
            onChange={(e) => setnota3(e.target.value)}
            value={nota3}
            style={styles.buttons}
          />
        </View>
        <View style={styles.body}>
          <Text>Definitiva</Text>
          <TextInput disabled value={definitiva} style={styles.buttons} />
        </View>
        <View style={styles.body}>
          <Text>observacion</Text>
          <TextInput
            onChange={(e) => setobservacion(e.target.value)}
            value={observacion}
            style={styles.buttons}
          />
        </View>
      </View>
      <View style={[styles.options, { marginTop: 20, flexDirection: 'row' }]}>


        <TouchableOpacity
          style={[styles.optionsbuttons, { backgroundColor: 'orange' }]}
          onPress={() => {
            guardar(); //llamamos el guardar junto con el calcular
          }}>
          <Text style={styles.buttonText}>Guardar{'\n'}Calcular</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionsbuttons, { backgroundColor: '#F37878' }]}
          onPress={() => {
            limpiar(); //llamamos el limpiar
          }}>
          <Text style={styles.buttonText}>Limpiar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionsbuttons, { backgroundColor: '#ECB390' }]}
          onPress={() => {
            buscar(identificacion); //llamamos el buscar
          }}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50,
  },

  header: {
    backgroundColor: '#D3EBCD',
    width: '100%',
    alignItems: 'center',
  },
  body: {
    width: '100%',
    display: 'flex',
    flex: 2,
    flexDirection: 'row',
    marginTop: '20px',
    alignItems: 'space-around',
    justifyContent: 'space-between',
  },
  buttons: {
    borderBottomWidth: '1px',
    marginLeft: '30px',
    justifyContent: 'center',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '1rem',
  },
  optionsbuttons: {
    borderRadius: 50,
    padding: 10,
    width: 80,
    marginLeft: '30px',
    color: '',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
