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
import SquadStats from '../squadStats/index';


const getVisibleHeroes = (heroes, filter, squadIDs) => 
  heroes.filter(
    hero =>
    hero.name.toLowerCase().includes(filter.toLowerCase()) && !squadIDs.includes(hero.id)
  );


const getHeroForSquads = (heroes, squadIDs) =>
  heroes.filter(hero => squadIDs.includes(hero.id));

const getSquadStats = heroes =>
  heroes.reduce((acc, hero) => {
    acc.str += hero.strength;
    acc.int += hero.intelligence;
    acc.spd += hero.speed;
    return acc
  }, { str: 0, int: 0, spd: 0 });

  const getHeroesById = ( heroes, id ) =>  heroes.find(hero => hero.id === id)

export default class App extends Component {
  state = {
    heroes: [],
    filter: '',
    squadIDs: [],
    squad: []
  };

  componentDidMount() {
    axios.get('/api/heroes')
      .then(({
        data,
        status
      }) => {
        if (status === 200) {
          this.setState({
            heroes: data,
          })
        }
      });
    axios.get('/api/squads')
      .then(({
        data,
        status
      }) => {
        if (status === 200) {
          this.setState({
            squad: data,
          })
        }
      })
  }

  saveSquad = () => {
    const { heroes, squadIDs } = this.state;
      
    if (this.state.squadIDs.length === 0) return;

    const squadHeroes = getHeroForSquads(heroes, squadIDs);
    const squadStats = getSquadStats(squadHeroes);

    const squad = {
      heroes: squadHeroes,
      stats: squadStats
    };


    axios.post('/api/squads', squad)
      .then(({
        data,
        status
      }) => {
        if (status === 201) {
          this.setState(prevState => ({
            squad: [...prevState.squad, data]
          }), this.resetSquad);
        }
      })
    };

  resetSquad = () => {

    this.setState({
      squadIDs: []
    })
  }


  addHero = hero => {
   
    axios.post('/api/heroes', hero)
      .then(({
        data,
        status
      }) => {
        if (status === 201) {
          this.setState(prevState => ({
            heroes: [...prevState.heroes, data]
          }));
        }
      })


  };


  addHeroToSquad = id => {
    this.setState(prevState => ({
      squadIDs: [id, ...prevState.squadIDs],

    }))
  }

  deleteSavedSquad = id => {

    axios.delete(`api/squads/${id}`)
      .then(({
        status
      }) => {
        if (status === 200) {
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


  deleteHero = id => {

    axios.delete(`api/heroes/${id}`)
      .then(({
        status
      }) => {
        if (status === 200) {
          this.setState(prevState => ({
            heroes: prevState.heroes.filter(hero => hero.id !== id)
          }));
        }
      });
  };

  infoHero = id => { 
    const { name, strength, intelligence, speed } = getHeroesById( this.state.heroes, id);
    console.log("[Hero Info]");
    console.log("Name: ", name);
    console.log("Strength: ", strength);
    console.log("Intelligence: ", intelligence);
    console.log("Speed: ", speed);
  }



  handleFilterChange = str => {
    this.setState({
      filter: str
    });
  };


  render() {

    const { heroes, filter, squadIDs, squad } = this.state;
    const visibleHeroes = getVisibleHeroes(heroes, filter, squadIDs);
    const heroForSquad = getHeroForSquads(heroes, squadIDs);
    const squadStats = getSquadStats(heroForSquad);  
    return (
       <div className = { styles.App } >
        <MainTitle text = "Super Squad" / >
        <div className = { styles.container } >
          <Panel >
            <Title text = "Create Hero" / >
            <CreateHero onAddHero = { this.addHero } heroes = { heroes }/>
          </Panel>
          <Panel>
            <Title text = "Heroes" / >
            <HeroesFilter onHandleFilterChange = { this.handleFilterChange } filter = { filter }/> 
            <HeroList 
              heroes = { visibleHeroes } 
              onDeleteHero = { this.deleteHero }
              onInfoHero = { this.infoHero }
              onAddHeroToSquad = { this.addHeroToSquad }/>
            </Panel>
            <Panel>
              <Title text = "Squad Editor" / >
              <SquadStats onSquadStats={squadStats} />
              <SquadEditorList 
                heroForSquad = { heroForSquad}
                onDeleteHeroFromSquad = { this.deleteHeroFromSquad }
                onSaveSquad = { this.saveSquad }
                onResetSquad = { this.resetSquad }/>
            </Panel>
            <Panel>
              <Title text = "Saved Squads" / >
              <SquadSavedList 
                squad = { squad }
                onDeleteSavedSquad = { this.deleteSavedSquad }/>
            </Panel>
          </div>
        </div>
    );
  }
};
