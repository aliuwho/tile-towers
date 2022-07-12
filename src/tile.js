import React from 'react';

export class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: props.index,
            type: props.type,
            selected: props.selected
        };
    }

    render() {
        /* TODO dynamic squares */
        if (this.props.selected) {
            return (
                <svg className="tile-selected"
                     width="52px" height="52px">
                    <rect x="0" y="0" width="50px" height="50px" fill={this.getColor(this.props.type)} stroke="black"
                          strokeWidth="1px"/>
                    {this.getShape(this.props.type)}
                </svg>
            );
        }
        return (
            <svg className="tile"
                 width="52px" height="52px">
                <rect x="0" y="0" width="50px" height="50px" fill={this.getColor(this.props.type)} stroke="black"
                      strokeWidth="1px"/>
                {this.getShape(this.props.type)}
                {/*<text x="0" y="30" fill="pink">{this.props.index}</text>*/}
            </svg>
        );
    }

    getColor(tileType) {
        switch (tileType % 4) {
            case 0:
                return "orangered";
            case 1:
                return "goldenrod";
            case 2:
                return "white";
            default:
                return "steelblue";
        }
    }

    getShape(tileType) {
        switch (tileType % 9) {
            case 0:
                return (<circle cx="25" cy="25" r="20" fill="black"/>);
            case 1:
                return (<polygon points="25,5 5,45 45,45"
                                 fill="purple"/>);
            case 2:
                return (<rect x="5" y="5" width="40" height="40" fill="green"/>);
            case 3:
                return (<circle cx="25" cy="25" r="20" fill="purple"/>);
            case 4:
                return (<rect x="5" y="5" width="40" height="40" fill="black"/>);
            case 5:
                return (<polygon points="25,5 5,45 45,45"
                                 fill="purple"/>);
            case 6:
                return (<polygon points="25,5
                30,20 45,20 32,30 37,45
                25,35
                12,45 17,30 5,20 20,20"
                                 fill="green"/>);
            case 7:
                return (<polygon points="25,5
                30,20 45,20 32,30 37,45
                25,35
                12,45 17,30 5,20 20,20"
                                 fill="black"/>);
            default:
                return;
        }
    }
}