import React from 'react';
import {tileDim} from "./index";

export class Tile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        /* TODO dynamic squares */
        if (this.props.type === -1) {
            return this.renderInvisTile();
        }
        if (this.props.selected === this.props.index) {
            return this.renderSelectedTile();
        }
        return this.renderUnselectedTile();
    }

    renderInvisTile() {
        return (
            <svg className="tile-invisible"
                 width={tileDim + 2 + "px"} height={tileDim + 2 + "px"}>
            </svg>);
    }

    renderSelectedTile() {
        return (
            <svg className="tile-selected"
                 x={0} y={0}
                 width={tileDim + 2 + "px"} height={tileDim + 2 + "px"}
                 onClick={() => {
                     this.props.handler(this.props.index);
                     // this.setState({
                     //     selected: true
                     // });
                 }}>
                <rect x="-5" y="-5" width={tileDim} height={tileDim}
                      fill="gray" stroke="black"
                      strokeWidth="1px"/>
                {this.getShape(this.props.type)}
                <rect x="0" y="0" width={tileDim} height={tileDim}
                      fill={this.getColor(this.props.type)} stroke="black"
                      strokeWidth="1px"/>
                {this.getShape(this.props.type)}
            </svg>);
    }

    renderUnselectedTile() {
        return (
            <svg className="tile"
                 width={tileDim + 10 + "px"} height={tileDim + 10 + "px"}
                 x="-20px"
                 onClick={() => {
                     this.props.handler(this.props.index);
                 }}>
                <rect x="-5" y="-5" width={tileDim} height={tileDim}
                      fill="gray" stroke="black"
                      strokeWidth="1px"/>
                {this.getShape(this.props.type)}
                <rect x="0" y="0" width={tileDim} height={tileDim}
                      fill={this.getColor(this.props.type)} stroke="black"
                      strokeWidth="1px"/>
                {this.getShape(this.props.type)}
                <text x="0" y="30" fill="pink">{this.props.right}</text>
            </svg>
        );
    }

    getColor(tileType) {
        if (tileType === -1) {
            return "green";
        }
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
        if (tileType === -1) {
            return (<circle cx="25" cy="25" r="20" fill="pink"/>);
        }
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
                                 fill="green"/>);
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
                return (<polygon points="25,5 5,45 45,45"
                                 fill="black"/>);
        }
    }
}