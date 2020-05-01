import classnames from 'classnames';
import React from 'react';
import './App.css';


const SPEED = 1000;
const NUM_SQUARES = 49;
const GAME_NAME = 'Becoming Tim Burners-Lee';
const squares = [
{
  index: 1,
  date: 'June 5 1955',
  text: 'You are born. Well done!',
  movement: 0,
},
{
  index: 3,
  date: 'September 27 1969',
  text: "You start at secondary school. You're going up in the world!",
  movement: 0,
},
{
  index: 5,
  date: 'May 20 1973',
  text: 'Hooray! You graduated!',
  movement: 3,
},
{
  index: 7,
  date: 'January 1, 1976',
  text: 'You spend a lot of time designing computer languages. Very clever!',
  movement: 0,
},
{
  index: 9,
  date: 'January 1, 1978',
  text: 'Congratulation, you got a job at D.G. Nash Ltd writing typesetting software',
  movement: 2,
},
{
  index: 13,
  date: 'January 1 1980',
  text: "You're now working as an independent contractor at CERN in Switzerland building software.",
  movement: 0,
},
{
  index: 15,
  date: 'April 20, 1981',
  text: 'You have started a new job at John Pooles image computer systems, getting experience in computer networking.',
  movement: 1,
},
{
  index: 17,
  date: 'April 20, 1984',
  text: 'You have gone back to work at CERN as a permanent employee.',
  movement: 0,
},
{
  index: 19,
  date: 'January 1, 1990',
  text: "Congratulation, you have married Nancy Carlson. She's an American computer programmer and former figure skater (but you know that!).",
  movement: 5,
},
{
  index: 21,
  date: 'January 1, 1990',
  text: "You're on the fire — at the peak of your career. (Someone had better get a fire extinguisher!)",
  movement: 3,
},
{
  index: 23,
  date: 'August 6 1991',
  text: 'Exciting times! The first website launched to the public.',
  movement: 1,
  backgroundUrl: 'tbl-01.jpg',
},
{
  index: 25,
  date: 'August 6 1991',
  text: 'WWWow! The WWW (World Wide Web) has launched!',
  movement: 3,
},
{
  index: 29,
  date: 'January 1, 1992',
  text: 'There are now over 50 web servers in the world',
  movement: 0,
},
{
  index: 31,
  date: 'August 20 1993',
  text: 'The CERN website is getting ten thousand hits a day!',
  movement: 1,
},
{
  index: 33,
  date: 'January 1 1994',
  text: 'You have founded the World Wide Web Consortium (W3C)',
  movement: 0,
},
{
  index: 35,
  date: 'April 20 1994',
  text: 'You have become the 6th member of World Wide Web, to improve standards and allow anyone to access freely.',
  movement: 1,
},
{
  index: 37,
  date: 'December 1, 2004',
  text: 'You have become a professor in the Computer Science Department at University of Southhampton. Smarty pants!',
  movement: 1,
},
{
  index: 39,
  date: 'January 1, 2009',
  text: 'You are working on a project to make UK data more publicly available.',
  movement: 3,
},
{
  index: 43,
  date: 'January 1, 2009',
  text: 'You have launched a charity called World Wide Web Foundation in Uganda.',
  movement: 0,
},
{
  index: 45,
  date: 'June 20, 2014',
  text: 'You have married again, this time to Rosemary Leith.',
  movement: 1,
},

{
  index: 10,
  text: 'Uh oh! You have dropped your pencil. Clumsy!',
  movement: -2,
},
{
  index: 22,
  text: 'You are stuck in a traffic jam on the way to CERN. Beep beep. Sigh.',
  movement: -2,
},
{
  index: 4,
  text: 'Your foot has got stuck in a rabbit hole. Someone help!',
  missTurn: 1,
},
{
  index: 47,
  text: 'You have forgotten the password for your computer. Try 123456?',
  movement: -11,
},
{
  index: 18,
  text: "Disaster! CERN has run out of coffee so you can't wake up. Yawn!",
  missTurn: 1,
},
{
  index: 27,
  text: "You arrive at CERN and realise you are still in your PJ's. Oops!",
  movement: -7,
},
{
  index: 41,
  text: "You forgot to have a shower, and are stinking out the whole university!",
  movement: -5,
},
{
  index: 38,
  text: "You fell asleep in your own lecture.",
  movement: -6,
},
{
  index: 44,
  text: "You have caught a cold.",
  missTurn: 1,
},
];
const BOARD_BACKGROUND_URL = '/background.jpeg';

/***********************/

class Player extends React.Component {
  render() {
    return <span className={`Player Player--${this.props.data.index}` + (this.props.data.active ? ' Player--active' : ' Player--inactive')}>
      {this.props.data.name}
    </span>
  }
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.playersSeen = {};
  }

  hasData() {
    return !!this.props.data.index;
  }

  calcReveal(players) {
    this.props.players.forEach(p => this.playersSeen[p.index] = true);
    const numPlayersSeen = Object.values(this.playersSeen).length;
    return Math.round((numPlayersSeen / this.props.playerCount) * 4)/0.04;
  }

  render() {
    const reveal = this.calcReveal();
    return <li className={classnames({
        Square: true,
        'Square--is-good': this.hasData(),
        'Square--is-bad': this.props.data.movement < 0 || this.props.data.missTurn,
        'Square--reveal25': reveal === 25,
        'Square--reveal50': reveal === 50,
        'Square--reveal75': reveal === 75,
        'Square--reveal100': reveal === 100,
      })}>
      <h3>{this.props.index+1}</h3>
      {this.props.data.date ? <div>{this.props.data.date}</div> : ''}
      {/*<div>{this.props.data.text}</div>*/}
      <div className="square_players">
        {this.props.players.map((p, i) => <Player data={p} key={i} />)}
      </div>
    </li>;
  }
}

class SquareDetails extends React.Component {
  getMovementText() {
    if (!this.props.square.movement) {
      return;
    }
    return <p>
      {[
        this.props.square.movement < 0
          ? 'Go back'
          : 'Move forward',
        Math.abs(this.props.square.movement),
        Math.abs(this.props.square.movement) === 1
          ? 'space.'
          : 'spaces.'
      ].join(' ')}
    </p>
  }

  getMissedTurnText() {
    if (!this.props.square.missTurn) {
      return;
    }
    return <p>
      {[
        'Miss',
        Math.abs(this.props.square.missTurn) === 1
          ? 'a turn.'
          : `${this.props.square.missTurn} turns.`
      ].join(' ')}
    </p>
  }

  render() {
    return <div className="SquareDetails modal">
      {this.props.square.date ? <h3>{this.props.square.date}</h3> : ''}
      {this.props.square.backgroundUrl ? <img src={this.props.square.backgroundUrl} alt="" /> : ''}
      <p>{this.props.square.text}</p>
      {this.getMovementText()}
      {this.getMissedTurnText()}
      <button onClick={this.props.close}>OK</button>
    </div>
  }
}

class Dice extends React.Component {
  render() {
    if (this.props.idle) {
      return <div className={`Dice Dice--idle Player--${this.props.player.index}`} onClick={this.props.roll} title="Click or press space to roll"></div>
    } else if (this.props.rolling) {
      return <div className={`Dice Dice--rolling Player--${this.props.player.index}`}></div>
    } else {
      return <div className={`Dice Player--${this.props.player.index}`}>{this.props.value}</div>
    }
  }
}

class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.nameEls = [...Array(4)].map(() => React.createRef());
  }

  onSubmit(e) {
    e.preventDefault();
    const players = this.nameEls
      .map(el => el.current.value)
      .filter(Boolean)
      .map((name, index) => ({ index, name }));
    if (players.length === 0) {
      this.setState({
        error: 'You must enter at least one player name',
      });
      return;
    }
    this.props.setPlayers(players);
  }

  componentDidMount(prevProps, prevState) {
    setTimeout(() => this.nameEls[0].current.focus(), 0);
  }

  render() {
    return <form className="Setup" onSubmit={this.onSubmit.bind(this)}>
      <h1>{GAME_NAME}</h1>
      {this.state.error ? <div className="error">{this.state.error}</div> : ''}
      {this.nameEls.map((_, i) =>
        <div key={i}>
          <label htmlFor={`player${i}`}>Player {i+1}: </label>
          <input ref={this.nameEls[i]} type="text" id={`player${i}`}  />
        </div>
      )}
      <button type="submit">Go!</button>
    </form>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diceValue: 1,
      diceIsIdle: true,
      active_player: 0,
      player_positions: [],
      missedTurns: {},
      // remove for testing:
      // players: [
      //   { index: 0, name: 'Alice' },
      //   { index: 1, name: 'Bob' },
      //   { index: 2, name: 'Charlie' }
      // ],
      // player_positions: [0,0,0],
    };
  }

  activeSquare() {
    return squares.find(s =>
      this.state.player_positions[this.state.active_player] === s.index
    );
  }

  activePlayer() {
    return this.state.players[this.state.active_player];
  }

  rollDice() {
    this.setState({
      diceIsIdle: false,
      diceIsRolling: true,
    }, () => {
      setTimeout(this.finishDiceRoll.bind(this), SPEED * Math.max(0.2,Math.random()));
    });
  }

  finishDiceRoll() {
    const diceValue = Math.floor(Math.random() * 6 + 1);
    this.setState({
      diceIsRolling: false,
      diceValue,
    }, () => {
      setTimeout(this.moveActivePlayer.bind(this, null, () => {
        if (this.activeSquare()) {
          setTimeout(this.showSquareDetail.bind(this), SPEED * 0.5);
        } else {
          setTimeout(this.nextPlayer.bind(this), SPEED/2);
        }
      }), SPEED/2);
    });
  }

  moveActivePlayerBy(delta, callback) {
    const positions = this.state.player_positions;
    const currentPosition = positions[this.state.active_player];
    this.moveActivePlayer(currentPosition + delta, callback);
  }

  moveActivePlayer(finalPosition, callback) {
    const positions = this.state.player_positions;
    const currentPosition = positions[this.state.active_player];
    if (!finalPosition) {
      finalPosition = currentPosition + this.state.diceValue;
    }
    let newPosition;
    if (finalPosition < currentPosition) {
      newPosition = currentPosition - 1;
    } else {
      newPosition = currentPosition + 1;
    }
    // don't go passed last square
    if (newPosition > NUM_SQUARES-1) {
      newPosition = NUM_SQUARES-1;
    } else if (newPosition < 0) {
      newPosition = 0;
    }
    positions[this.state.active_player] = newPosition;

    // Winner!
    if (newPosition === NUM_SQUARES-1) {
      this.setState({
        player_positions: positions,
      }, () => {
        setTimeout(() => {
          this.setState({ winner: this.state.active_player });
        }, 500);
      });
      return;
    }

    this.setState({
      player_positions: positions,
    }, () => {
      if (newPosition === finalPosition) {
        callback();
      } else {
        setTimeout(() => this.moveActivePlayer(finalPosition, callback), SPEED/5);
      }
    });
  }

  showSquareDetail() {
    this.setState({
      showSquareDetail: true,
    })
  }

  nextPlayer() {
    let nextPlayer = this.state.active_player + 1;
    if (nextPlayer > this.state.players.length-1) {
      nextPlayer = 0;
    }
    const missedTurns = this.state.missedTurns;
    if (missedTurns[nextPlayer] > 0) {
      missedTurns[nextPlayer]--;
      this.setState({
        active_player: nextPlayer,
        missedTurns,
      },
        () => this.nextPlayer()
      )
      return;
    }
    this.setState({
      active_player: nextPlayer,
      diceIsIdle: true,
    })
  }

  closeSquareDetails() {
    this.setState({
      showSquareDetail: false,
    }, () => {
      setTimeout(() => {
        if (this.activeSquare().movement) {
          this.moveActivePlayerBy(
            this.activeSquare().movement,
            () => setTimeout(this.nextPlayer.bind(this), SPEED)
          );
        } else if (this.activeSquare().missTurn) {
          const missedTurns = this.state.missedTurns;
          if (!missedTurns[this.state.active_player]) {
            missedTurns[this.state.active_player] = 0;
          }
          missedTurns[this.state.active_player]++;
          this.setState(
            { missedTurns },
            () => setTimeout(this.nextPlayer.bind(this), SPEED)
          );
        } else {
          setTimeout(this.nextPlayer.bind(this), SPEED/2);
        }
      }, SPEED*0.1);
    });
  }

  setPlayers(players) {
    this.setState({
      players,
      player_positions: players.map(p => 0),
    });
  }

  playersOnPosition(position) {
    return this.state.players
      .filter(p => this.state.player_positions[p.index] === position);
  }

  markActivePlayer(players) {
    return players
      .map(p => ({...p, active: this.state.active_player === p.index}));
  }

  reload() {
    window.location.reload();
  }

  componentDidMount() {
    document.addEventListener('keypress', event => {
      if (!this.state.players) {
        return;
      }
      // space
      if (this.state.diceIsIdle && event.keyCode === 32) {
        this.rollDice();
        event.preventDefault();
        return;
      };
      // return
      if (this.state.showSquareDetail && event.keyCode === 13) {
        this.closeSquareDetails();
        event.preventDefault();
        return;
      };
      // return
      if (this.state.winner != null && event.keyCode === 13) {
        this.reload();
        event.preventDefault();
        return;
      };
    })
  }

  render() {
    if (this.state.players) {
      return <div className="App">
        <h1>{GAME_NAME}</h1>
        <p>{this.activePlayer().name}'s turn to roll the dice</p>
        <Dice
          value={this.state.diceValue}
          idle={this.state.diceIsIdle}
          rolling={this.state.diceIsRolling}
          roll={this.rollDice.bind(this)}
          player={this.activePlayer()}
        />
        {this.state.winner != null
          ? <div className="Mask">
              <div className="Winner modal">
                <h2>Congratulations, {this.activePlayer().name}, you are now Tim Burners-Lee!</h2>
                <p>Tim Burners-Lee is the winner.</p>
                <div>
                  <button onClick={this.reload}>Play again</button>
                </div>
              </div>
            </div>
         : ''}
        <ol className="Board" style={{ background: `url(${BOARD_BACKGROUND_URL})` }}>
          {[...Array(NUM_SQUARES)].map((_, index) =>
            <Square
              key={index}
              index={index}
              data={squares.find(s => s.index === index) || {}}
              playerCount={this.state.players.length}
              players={this.markActivePlayer(this.playersOnPosition(index))}
            />
          )}
        </ol>
        {this.state.showSquareDetail && this.activeSquare()
          ? <div className="Mask">
              <SquareDetails square={this.activeSquare()} close={this.closeSquareDetails.bind(this)} />
          </div>
          : undefined
        }
      </div>
    } else {
      return <div className="App">
        <Setup setPlayers={this.setPlayers.bind(this)} />
      </div>;
    }
  }
}

export default App;
