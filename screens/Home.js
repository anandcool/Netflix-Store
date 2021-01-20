import React,{useEffect, useState} from 'react'
import {StyleSheet, ScrollView } from 'react-native'
import {Fab,Icon,List,ListItem,Left,Button,Body,Text,Right,CheckBox,Title,H1,Subtitle,Container, Spinner} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native'


const Home = ({navigation,route}) =>{

    const [listOfSeasons, setListOfSeasons] = useState([])
    const [loading, setLoading] = useState(false)

    const isFocused = useIsFocused()

    const getList = async () =>{
      setLoading(true)

      const storedValue = await AsyncStorage.getItem('@season_list');
      if(!storedValue){
        setListOfSeasons([])
      }
      const list = JSON.parse(storedValue)
      setListOfSeasons(list)
      setLoading(false)

    }

    const deleteSeason = async () =>{

    }

    const markComplete = async () =>{

    }

    useEffect(()=>{
      getList()
    },[isFocused])
   
    if(loading){
      return (
        <Container style={styles.container}>
          <Spinner color="#00b7c2"/>
        </Container>
      )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
          {listOfSeasons.length === 0 ? (
            <Container style={styles.container}>
              <H1 style={styles.heading}>
                Watchlist is empty. Please add a season
              </H1>
            </Container>
          ) :(
            <>
            <H1 style={styles.heading}>Next series to Watch</H1>
            <List>
              {listOfSeasons.map(season =>{
                return (
                  <ListItem key={season.id} style={styles.listItem}>
                  <Left>
                    <Button
                    style={styles.actionButton}
                    danger
                    >
                      <Icon name="trash" active/>
                    </Button>
                    <Button
                    style={styles.actionButton}>
                      <Icon name="edit" active type="Feather"/>
                    </Button>
                  </Left>
                  <Body>
                    <Title style={styles.seasonName}>{season.name}</Title>
                    <Text note> {season.totalNoSeason} Seasons to watch</Text>
                  </Body>
                  <Right>
                    <CheckBox/>
                  </Right>
                </ListItem>
                )
              })}
            </List>
            </>
          )}
 
 
        <Fab
        style={{backgroundColor:'#5067FF'}}
        position="bottomRight"
        onPress={()=>navigation.navigate('Add')}
        >
         <Icon name="add"/>   
        </Fab>
        </ScrollView>
    )

}


export default Home

const styles = StyleSheet.create({
    emptyContainer: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginVertical: 15,
      marginHorizontal: 5,
    },
    actionButton: {
      marginLeft: 5,
    },
    seasonName: {
      color: '#fdcb9e',
      textAlign: 'justify',
    },
    listItem: {
      marginLeft: 0,
      marginBottom: 20,
    },
  });