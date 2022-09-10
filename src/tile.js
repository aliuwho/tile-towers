import React from 'react';
import {TILE_DIM} from "./util";

// NOTE: palette is colorblind friendly :)
const Color = {
    RED: "rgb(238,102,119)",
    YELLOW: "rgb(204,187,68)",
    GREEN: "rgb(34,136,51)",
    WHITE: "rgb(255,255,255",
    BLACK: "rgb(0,0,0)",
    BLUE: "rgb(68,119,170)",
    PURPLE: "rgb(170,51,119)",
    CYAN: "rgb(102,204,238)",
    GREY: "rgb(187,187,187)"
}


export class Tile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        /* TODO add dynamic shading / 3d qualities so its easy to tell diff tiles */
        if (this.props.type === -1) {
            return this.renderInvisibleTile();
        }
        if (this.props.selected === this.props.index) {
            return this.renderSelectedTile();
        }
        return this.renderUnselectedTile();
    }

    renderInvisibleTile() {
        return (
            <svg className="tile-invisible"
                 style={this.props.style}
                 width={TILE_DIM + 2 + "px"} height={TILE_DIM + 2 + "px"}>
            </svg>);
    }

    renderSelectedTile() {
        return (
            <svg className="tile-selected"
                 style={this.props.style}
                 x={0} y={0}
                 width={TILE_DIM + 2 + "px"} height={TILE_DIM + 2 + "px"}
                 onClick={() => {
                     this.props.handler(this.props.index);
                     // this.setState({
                     //     selected: true
                     // });
                 }}>
                <rect x="-5" y="-5" width={TILE_DIM} height={TILE_DIM}
                      fill={Color.GREY} stroke={Color.BLACK}
                      strokeWidth="1px"/>
                {this.getShape(this.props.type)}
                <rect x="0" y="0" width={TILE_DIM} height={TILE_DIM}
                      fill={this.getColor(this.props.type)} stroke={Color.BLACK}
                      strokeWidth="1px"/>
                {this.getShape(this.props.type)}
            </svg>);
    }

    renderUnselectedTile() {
        return (
            <svg className="tile"
                 style={this.props.style}
                 width={TILE_DIM + 10 + "px"} height={TILE_DIM + 10 + "px"}
                 x="-20px"
                 onClick={() => {
                     this.props.handler(this.props.index);
                 }}>
                <rect x="-5" y="-5" width={TILE_DIM} height={TILE_DIM}
                      fill={Color.GREY} stroke={Color.BLACK}
                      strokeWidth="1px"/>
                {this.getShape()}
                <rect x="0" y="0" width={TILE_DIM} height={TILE_DIM}
                      fill={this.getColor()} stroke={Color.BLACK}
                      strokeWidth="1px"/>
                {this.getShape()}
                <text x="0" y="30" fill={Color.GREY}>{this.props.right}</text>
            </svg>
        );
    }

    getColor() {
        if (this.props.type === -1) {
            return Color.GREEN;
        }
        switch (this.props.type % 4) {
            case 0:
                return Color.RED;
            case 1:
                return Color.YELLOW;
            case 2:
                return Color.WHITE;
            default:
                return Color.BLUE;
        }
    }

    renderCircle(color: Color) {
        return <circle cx="25" cy="25" r="20" fill={color}/>;
    }

    renderTriangle(color: Color) {
        return <polygon points="25,5 5,45 45,45" fill={color}/>;
    }

    renderRectangle(color: Color) {
        return <rect x="9" y="9" width="30" height="30" fill={color}/>;
    }

    renderStar(color: Color) {
        return <polygon points="25,5
                30,20 45,20 32,30 37,45
                25,35
                12,45 17,30 5,20 20,20"
                        fill={color}/>
    }

    getShape() {
        if (this.props.type === -1) {
            return this.renderCircle(Color.CYAN);
        }
        switch (this.props.type % 9) {
            case 0:
                return this.renderCircle(Color.BLACK);
            case 1:
                return this.renderTriangle(Color.PURPLE);
            case 2:
                return this.renderRectangle(Color.CYAN);
            case 3:
                return this.renderCircle(Color.PURPLE);
            case 4:
                return this.renderRectangle(Color.BLACK);
            case 5:
                return this.renderTriangle(Color.GREEN);
            case 6:
                return this.renderStar(Color.GREEN);
            case 7:
                return this.renderStar(Color.CYAN);
            default:
                return this.renderTriangle(Color.BLACK);
        }
    }
}