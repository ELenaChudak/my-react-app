import React, { Component, memo } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'chart.js'

class ChartView extends Component {
    constructor() {
        super();
        this.chart = null;
    }

    createChart = () => {
        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: this.props.labels,
                datasets: this.props.datasets,
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            autoSkip: false,
                            maxRotation: 80,
                            minRotation: 80
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Multiple Historical OHLCV'
                }
            }
        });
    };

    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate = () => {
        this.createChart();
    }

    render () {


        return (
            <div style={{ width: '100%', height: '100%' }}>
                <canvas
                    ref={elem => this.ctx = elem}
                />
            </div>
        )
    }
}

export default memo(ChartView);
