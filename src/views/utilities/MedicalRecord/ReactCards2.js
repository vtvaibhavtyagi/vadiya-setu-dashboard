import { ToggleCard, TinderLikeCard, StackCard } from 'react-stack-cards'
import React from 'react';

export default class ReactCards2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            directionTinder: props.swipee,
            swipex: false
        }
        this.Tinder = null
    }

    componentDidMount() {
        console.log("RC2_Mount");
    }

    componentDidUpdate() {
        this.props.rc2_swipp? this.Tinder.swipe():console.log("RC2_SWip_false");
        
    }


    render() {
        const arr = ["first", "second", "third", "fourth", "fifth", "sixth"];
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        //const colors = ["red", "blue", "green"];
        const dis2_card = this.props.dis2;
        const tar = this.props.targett;
        return (
            <>

                <div>
                    <TinderLikeCard
                        images={arr}
                        width="350"
                        height="250"
                        direction={this.state.directionTinder}
                        duration={400}
                        ref={(node) => this.Tinder = node}
                        className="tinder"
                    >

                        {tar == "diagno" ?
                            <div className="card text-white shadow-lg bg-dark mb-3" style={{ height: "400px", width: "400px" }}>
                                <div className="card-header">Diagnostics</div>
                                <div className="card-body">
                                    {dis2_card.diagnosis.map(data_diag =>
                                        <div>
                                            <h5 className="card-title">{data_diag.date}</h5>
                                            <ul>
                                                {data_diag.vSymptoms.map(data_symp => <li className="card-text">{data_symp}</li>)}
                                            </ul>
                                        </div>
                                    )}

                                </div>
                            </div>
                            :

                            <div className="card text-white shadow-lg bg-dark mb-3" style={{ height: "400px", width: "400px" }}>
                                <div className="card-header">Treatment</div>
                                <div className="card-body">
                                    {dis2_card.treatment.slice(0,3).map(data_treat =>
                                        <div>
                                            <ul>
                                            <li>
                                            <h5 className="card-title">{data_treat.desc}</h5>
                                            <h6 className="card-title">{data_treat.date}</h6>
                                            </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>



                        }


                        {/*}
                                        {numbers.map(i => <div>{i}</div>)} */}
                    </TinderLikeCard>
                </div>



            </>

        );
    }
}