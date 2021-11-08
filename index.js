import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Buttons for player to click
function Square(props) 
{
    //button changes colour depending on which player clicked it 
    return (<button className="square" style={props.style} onClick={props.onClick}></button>);
}

//Grid class - the 6x7 grid
class Grid extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      squares: Array(42).fill(null),//Empty array
      redIsNext: true,//turns
      filled: Array(42).fill('#FFFFFF'),//fills the array with the colour white
    };
  }
  //handles the event of when a button is clicked
  handleClick(i) 
  {
    const squares = this.state.squares.slice();//creates a copy of squares array to modify
    const filled = this.state.filled.slice();//creates a copy of the filled array to modify

    if (checkWinner(squares) || squares[i]) {return;} //checks if theres a winner or if all the buttons are filled after each round

    squares[i] = this.state.redIsNext ? 'red' : 'yellow'; //assigns a square a value based on whos turn it is
    filled[i] = this.state.redIsNext ? '#FF0000' : '#FFD500';//assigns the color of square based on whos turn it is
    
    this.setState({
      squares: squares, //updates squares array
      redIsNext: !this.state.redIsNext, //switches turns
      filled: filled, //updates filled array
    });
  }
  //fills the square with the required information and sends it to the Square function
  renderSquare(i) 
  {
    return(
    <Square 
    value={this.state.squares[i]}
    style={{"backgroundColor":this.state.filled[i]}}
    onClick={() => this.handleClick(i)}
    />
    );
  }
  render() 
  {
    const winner = checkWinner(this.state.squares); //checks the winner
    let status;
    if (winner) {status = 'Winner: ' + winner;} //if theres a winner
    else {status = 'Next player: ' + (this.state.redIsNext ? 'red' : 'yellow');} //else continue the game
    //renders the squares and displays status of game
    return (
      <div>
        <div className="status">{status}</div> 
        <div className="grid-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
        </div>
        <div className="grid-row">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
        </div>
        <div className="grid-row">
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
        </div>
        <div className="grid-row">
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
        </div>
        <div className="grid-row">
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
        </div>
        <div className="grid-row">
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
          {this.renderSquare(40)}
          {this.renderSquare(41)}
        </div>
      </div>
    );
  }
}

//checks if theres a winner to the game 
function checkWinner(squares) 
{
  //array combinations where the player would win
  const arrayWin = [ [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10],[34, 33, 32, 31], 
  [14, 15, 16, 17], [27, 26, 25, 24], [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31],
  [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], [0, 7, 14, 21], [41, 34, 27, 20],
  [1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], [3, 10, 17, 24],
  [38, 31, 24, 17], [4, 11, 18, 25], [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15],
  [6, 13, 20, 27], [35, 28, 21, 14], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
  [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 32], 
  [33, 32, 31, 30], [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28], [8, 15, 22, 29],
  [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34],];
  
  //checks if there's four of the same pieces horizontally/vertically
  for (let i = 0; i < arrayWin.length; i++) 
  {
    const [a, b, c, d] = arrayWin[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]&&squares[a] === squares[d]) {
      return squares[a];
    }
  }
  if (!squares.includes(null)){return 'Draw';}//if all the squares are filled
  //if theres no winner
  return null;
}
//Game class wraps the grid class to display under certain settings
class Game extends React.Component 
{
  render() 
  {
    return (<div className="game"> <Grid /> </div>);
  }
}

//renders game
ReactDOM.render(<Game />, document.getElementById('root'));
