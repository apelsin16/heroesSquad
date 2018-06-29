import React, { Component } from 'react';
import axios from 'axios';
import Panel from '../shared/panel';
import MainTitle from '../mainTitle';
import Title from '../shared/title';
import CreateHero from '../createHero';
import HeroList from '../heroList';
import HeroesFilter from '../heroesFilter';
import styles from './styles.css';
import SquadEditorList from '../squadEditorList';
import SquadSavedList from '../squadSavedList';


const getStrength = (heroes, squadIDs, strengthArr ) => heroes.filter( hero => squadIDs.includes(hero.id)).filter(item => strengthArr.push(item.strength)); 
const getIntelligence = (heroes, squadIDs, intelligenceArr ) => heroes.filter( hero => squadIDs.includes(hero.id)).filter(item => intelligenceArr.push(item.intelligence));
const getSpeed = (heroes, squadIDs, speedArr ) => heroes.filter( hero => squadIDs.includes(hero.id)).filter(item => speedArr.push(item.speed));

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const getVisibleHeroes = ( heroes, filter, squadIDs ) => {

  const filtered = heroes.filter( hero => 
    hero.name.includes(filter));
    
  return  filtered.filter( hero => squadIDs.indexOf(hero.id) === -1 )
 
};

const getHeroForSquads = ( heroes, squadIDs ) => 
  
  heroes.filter( hero => squadIDs.includes(hero.id));

export default class App extends Component {
  state = {
    heroes: [],
    filter: '',
    squadIDs: [],
    squad: []
  };

  componentDidMount() {
    axios.get('/api/heroes')
    .then(({data, status}) => {
      if (status === 200) {
        this.setState({
          heroes: data,
        })
      }
    });
    axios.get('/api/squads')
    .then(({data, status}) => {
      if (status === 200) {
        this.setState({
          squad: data,
        })
      }
    })
  }

  saveSquad = () => {
    const strengthArr = [];
    const intelligenceArr = [];
    const speedArr = []; 
      
    getStrength(this.state.heroes, this.state.squadIDs, strengthArr);
    getIntelligence(this.state.heroes, this.state.squadIDs, intelligenceArr);
    getSpeed(this.state.heroes, this.state.squadIDs, speedArr);

    if (this.state.squadIDs.length === 0){
      return;
    } 

    const h = this.state.heroes.filter( hero => this.state.squadIDs.includes(hero.id));
    const str = strengthArr.reduce(reducer);
    const int = intelligenceArr.reduce(reducer);
    const spd = speedArr.reduce(reducer);
    const squad = { heroes: h, stats:{str, int, spd} };


    axios.post('/api/squads', squad)
    .then(({data, status}) => {
      if (status ===201) {
        this.setState(prevState => ({      
          squad: [  ...prevState.squad, data]
    }));  
      }
    })     
    this.setState({
      squadIDs: []
    })
      
   
  };
  
  resetSquad = () => {

    this.setState({
      squadIDs: []
    })
  }
     

  addHero = ( name, strength, intelligence, speed) => {
    const hero = { name, strength, intelligence, speed};
    axios.post('/api/heroes', hero)
    .then(({data, status}) => {
      if (status ===201) {
        this.setState(prevState => ({      
     heroes: [  ...prevState.heroes, data]
    }));  
      }
    })

    
  };


  addHeroToSquad = id => {
    this.setState(prevState => ({
      squadIDs: [id, ...prevState.squadIDs ],
     
    }))
  }

  deleteSavedSquad = id => {

    axios.delete(`api/squads/${id}`)
    .then(({status}) => {
      if(status === 200) {
        this.setState(prevState => ({
          squad: prevState.squad.filter(item => item.id !== id)
    }));
      }
    });    
  };

  deleteHeroFromSquad = id => {
    this.setState(prevState => ({
      squadIDs: prevState.squadIDs.filter(el => el !== id)
    }))
  }
 
  
  deleteHero =  id  => {

    axios.delete(`api/heroes/${id}`)
    .then(({status}) => {
      if(status === 200) {
        this.setState(prevState => ({
      heroes: prevState.heroes.filter(hero => hero.id !== id)
    }));
      }
    });    
  };
  
  infoHero = id => {
    const infoOfHero =  this.state.heroes.filter(hero => hero.id === id);
    console.log("[Hero Info]"); 
    console.log("Name: ", infoOfHero[0].name);
    console.log("Strength: ", infoOfHero[0].strength);
    console.log("Intelligence: ", infoOfHero[0].intelligence);
    console.log("Speed: ", infoOfHero[0].speed);
  }

  

  handleFilterChange = str => {
    this.setState({ filter: str });
  };


  render() {
    
    const { heroes, filter, squadIDs, squad } = this.state;
    const visibleHeroes =  getVisibleHeroes(heroes, filter, squadIDs );
    const heroForSquad = getHeroForSquads(heroes, squadIDs);  
    
    return (
      <div className={styles.App}>
        <MainTitle text="Super Squad" />
        <div className={styles.container}>        
          <Panel>
            <Title text="Create Hero"/>
            <CreateHero onAddHero={this.addHero} heroes={heroes}/>
          </Panel>
          <Panel>        
            <Title text="Heroes"/>
            <HeroesFilter onHandleFilterChange={this.handleFilterChange} filter={filter}/>
            <HeroList heroes={visibleHeroes} onDeleteHero={this.deleteHero} onInfoHero={this.infoHero} onAddHeroToSquad={this.addHeroToSquad}/>
          </Panel>
          <Panel>
            <Title text="Squad Editor"/>  
            <SquadEditorList heroForSquad={heroForSquad} onDeleteHeroFromSquad={this.deleteHeroFromSquad} onSaveSquad={this.saveSquad} onResetSquad={this.resetSquad}/>      
          </Panel>
          <Panel>            
            <Title text="Saved Squads"/>    
            <SquadSavedList squad={squad} onDeleteSavedSquad={this.deleteSavedSquad} />   
          </Panel>
        </div>
      </div>
    );
  }
};

 
