import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Button, Alert } from 'react-native'
import Cabecalho from '../../../componentes/Cabecalho'
import Linha from '../../../componentes/Linha'
import Caixa from '../componentes/Caixa'
import Botao from '../componentes/Botao'
import { useEffect, useState } from 'react'
import { auth, db } from '../../../config/firebase'
import { capturaDadosUsuario } from '../../../servicos/req'
import moment from 'moment/moment'
import { styles } from './styles'
import { updateDoc, doc } from 'firebase/firestore'
import { pergunta03 } from '../../../mocks/perguntas'

export default function Pergunta03({ navigation }) {
    const [resposta03, setResposta3] = useState('')
    const [botaoAtivo, setBotaoAtivo] = useState(null);

    const botaoPressionado = (resposta) => {
        setResposta3(resposta);
        setBotaoAtivo(resposta);
    };

    const [dadosUsuario, setDadosUsuario] = useState([])
    let dia = moment().format('DD/MM/YYYY')
    
    useEffect(() => {
        auth.onAuthStateChanged(usuario => {
            if (usuario) {
                const result = usuario.uid
                //console.log(result)

                
                // Função para carregar os dados do Firestore
                async function carregarDadosFirestore() {
                    const users = await capturaDadosUsuario(result)
                    setDadosUsuario(users)
                }
                carregarDadosFirestore()
            }
        })
    }, [])

    async function pegarResposta(){
        if(resposta03 === ''){
            Alert.alert("Selecione uma resposta")
        }else{
            await updateDoc(doc(db, "formulario", dadosUsuario.id),{resposta03})
        navigation.navigate('Pergunta04')
        }
        
    }

    return (<>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <Cabecalho
                    texto="Formulário"
                    imagemEsquerda={require('../../../assets/voltar.png')}
                    imagemDireita={require('../../../assets/home.png')}
                    botaoEsquerda={{
                        onPress: () => navigation.goBack(),
                    }}
                    botaoDireita={{
                        onPress: () => navigation.navigate('Home'),
                    }}
                />

                <Linha />

                <>
                    <Text style={[styles.textUsuario, { fontSize: 22 }]}>{dadosUsuario.nome}</Text>
                    <Text style={styles.textData}>Data de Preenchimento: {dia}</Text>
                    <Text style={[styles.textUsuario, { marginLeft: '70%' }]}>03/19</Text>
                </>

                {/* caixa de perguntas do formulário */}
                <Caixa 
                texto={pergunta03}/>

                <View>
                    {/* Botões do formulário */}
                    <Botao
                        onPress={() => botaoPressionado("Sim")}
                        texto="Sim"
                        ativo={botaoAtivo === "Sim"}
                        onDesativar={() => setBotaoAtivo(null)}
                    />
                    <Botao
                        onPress={() => botaoPressionado("Não")}
                        texto="Não"
                        ativo={botaoAtivo === "Não"}
                        onDesativar={() => setBotaoAtivo(null)}
                    />
                    <Botao
                        onPress={() => botaoPressionado("Não sabe")}
                        texto="Não sabe"
                        ativo={botaoAtivo === "Não sabe"}
                        onDesativar={() => setBotaoAtivo(null)}
                    />
                    <Botao
                        onPress={() => botaoPressionado("Não se aplica")}
                        texto="Não se aplica"
                        ativo={botaoAtivo === "Não se aplica"}
                        onDesativar={() => setBotaoAtivo(null)}
                    />

                    {/* <Botao
                        onPress={() => { }}
                        texto='Próximo' 
                        style={[styles.botaoProximo]}/> */}

                    <TouchableOpacity
                        onPress={() => {pegarResposta()}}
                        style={styles.botaoProximo}>
                        <Text style={styles.textoProximo}>Próximo</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
        </>
    )
}
