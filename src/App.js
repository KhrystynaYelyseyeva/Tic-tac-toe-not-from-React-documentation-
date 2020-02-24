import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            count: 0,//кількість заповнених клітинок
            startValue: "X",
            win: 0,//запобіжник. після виграшу не можна продовжити гру
            oScore: 0,
            xScore: 0,
        };
        this.winnerLine = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ];

        this.resetGame = this.resetGame.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.isWinner = this.isWinner.bind(this);
    }

    resetGame() {
        this.setState({
            squares: Array(9).fill(null),
            count: 0,
            win: 0,
        });

        (document.querySelector(".O").classList.contains("none")) ?
            document.querySelector(".O").classList.remove("none") :
            document.querySelector(".X").classList.remove("none");

        let grid = document.querySelectorAll(".grid");
        for (let item of grid) {
            if (item.classList.contains("blue")) item.classList.remove("blue");
            if (item.classList.contains("red")) item.classList.remove("red");
            if (item.classList.contains("X-container")) item.classList.remove("X-container");
            if (item.classList.contains("O-container")) item.classList.remove("O-container");

        }

        let winner = document.querySelector(".winner");
        if (winner.classList.contains("winner-o")) winner.classList.remove("winner-o");
        if (winner.classList.contains("winner-x")) winner.classList.remove("winner-x");
        if (winner.classList.contains("winner-both")) winner.classList.remove("winner-both");
    }

    handleChange(e) {
        if (this.state.squares.find(elem => elem !== null)) this.resetGame();
        this.setState({startValue: e.target.value});
    }

    isWinner() {
        let s = (this.state.startValue === 'X') ?
            (this.state.count % 2 === 0) ? 'X' : 'O' :
            (this.state.count % 2 === 0) ? 'O' : 'X';
        for (let i = 0; i < 8; i++) {
            let line = this.winnerLine[i];
            if (this.state.squares[line[0]] === s &&
                this.state.squares[line[1]] === s &&
                this.state.squares[line[2]] === s) {
                if (s === "X") {
                    document.querySelector(".winner").classList.add("winner-x");
                    document.querySelector(`div[data="${line[0]}"]`).classList.add("X-container");
                    document.querySelector(`div[data="${line[1]}"]`).classList.add("X-container");
                    document.querySelector(`div[data="${line[2]}"]`).classList.add("X-container");
                    this.setState({xScore: this.state.xScore + 1});
                } else {
                    document.querySelector(".winner").classList.add("winner-o");
                    document.querySelector(`div[data="${line[0]}"]`).classList.add("O-container");
                    document.querySelector(`div[data="${line[1]}"]`).classList.add("O-container");
                    document.querySelector(`div[data="${line[2]}"]`).classList.add("O-container");
                    this.setState({oScore: this.state.oScore + 1});
                }
                this.setState({win: 1});
                return 0;
            }
        }

        return 1;
    }

    clickHandler(e) {
        let data = e.target.getAttribute("data");
        let currentSquares = this.state.squares;
        if (currentSquares[data] === null && this.state.win === 0) {
            (this.state.startValue === 'X') ?
                currentSquares[data] = (this.state.count % 2 === 0) ? 'X' : 'O' :
                currentSquares[data] = (this.state.count % 2 === 0) ? 'O' : 'X';
            (currentSquares[data] === 'X') ?
                e.target.classList.add("red") : e.target.classList.add("blue");
            this.setState({squares: currentSquares});

            this.isWinner();

            this.setState({count: this.state.count + 1});

            if (this.isWinner() !== 0 && this.state.count === 8) {
                document.querySelector(".winner").classList.add("winner-both");
                this.setState({win: 1});
            }
        }
    }

    render() {
        return (
            <div className="App">
                <div className="flex-container">
                    <div className="O-container">{this.state.oScore}</div>

                    <div className="game-container">
                        <h4>Who start?</h4>
                        <div className="who_start">
                            <label className="X red">X
                                <input type="radio" name="item_first_step" value="X" onChange={this.handleChange}/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="O blue">O
                                <input type="radio" name="item_first_step" value="O" onChange={this.handleChange}/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="tic-tac-toc">
                            <div className="grid" onClick={this.clickHandler} data="0">{this.state.squares[0]}</div>
                            <div className="grid" onClick={this.clickHandler} data="1">{this.state.squares[1]}</div>
                            <div className="grid" onClick={this.clickHandler} data="2">{this.state.squares[2]}</div>
                            <div className="grid" onClick={this.clickHandler} data="3">{this.state.squares[3]}</div>
                            <div className="grid" onClick={this.clickHandler} data="4">{this.state.squares[4]}</div>
                            <div className="grid" onClick={this.clickHandler} data="5">{this.state.squares[5]}</div>
                            <div className="grid" onClick={this.clickHandler} data="6">{this.state.squares[6]}</div>
                            <div className="grid" onClick={this.clickHandler} data="7">{this.state.squares[7]}</div>
                            <div className="grid" onClick={this.clickHandler} data="8">{this.state.squares[8]}</div>
                        </div>
                        <button className="button" onClick={this.resetGame}>Reset</button>
                        <div className="winner"></div>
                    </div>

                    <div className="X-container">{this.state.xScore}</div>
                </div>


            </div>

        );
    }
}

export default App;
