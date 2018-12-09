import React, { Component } from 'react';
import { 
    View, 
    Text,
    ScrollView,     
    } from 'react-native'

// information displayed in the About ACHS page
class AboutACHS extends Component {
    render() {
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <View style={{borderBottomColor: '#85251a',
                    borderBottomWidth: 5,}}>
                    <Text style = {{
                        fontWeight: 'bold', 
                        fontSize: 25, 
                        textAlign: 'center',
                        color: 'white', 
                        backgroundColor: '#A62E20',
                        paddingBottom: 10,
                        paddingTop: 10,              
                    }}>
                    Who we are
                </Text></View>
                    <Text style = {{
                        fontSize: 20,
                        paddingBottom: 20,
                        paddingTop: 10,
                        textAlign: 'center',
                    }}>
                    The Adams County Historical Society has often been referred 
                    to affectionately as the "county's attic"—an archive and museum 
                    preserving the rich cultural heritage of Adams County, Pennsylvania.   
                </Text>
                <View style={{borderBottomColor: '#85251a',
                    borderBottomWidth: 5,}}>
                    <Text style = {{
                        fontWeight: 'bold', 
                        fontSize: 25, 
                        textAlign: 'center',
                        color: 'white', 
                        backgroundColor: '#A62E20',
                        paddingBottom: 10,
                        paddingTop: 10,
                    }}>
                    Mission
                </Text></View>
                    <Text style = {{
                        fontSize: 20,
                        paddingBottom: 20,
                        paddingTop: 10,
                        textAlign: 'center',
                    }}>
                    Our mission is to "foster interest in the history of Adams County 
                    and vicinity, conduct research, preserve records and objects, 
                    mark sites, and pursue such activities as may be related to the 
                    history of the community."                 
                </Text>
                    <View style={{borderBottomColor: '#85251a',
                        borderBottomWidth: 5,}}>
                    <Text style = {{
                        fontWeight: 'bold', 
                        fontSize: 25, 
                        textAlign: 'center',
                        color: 'white', 
                        backgroundColor: '#A62E20',
                        paddingBottom: 10,
                        paddingTop: 10,
                    }}>
                    What We Offer
                </Text></View>
                        <Text style = {{
                        fontSize: 20,
                        paddingBottom: 20,
                        paddingTop: 10,
                        textAlign: 'center',
                    }}>
                    The Society offers twenty-one hours of public operation 
                    utilizing paid and volunteer staff to serve researchers at its 
                    headquarters at the Wolf House on the campus of the Lutheran 
                    Theological Seminary in Gettysburg.     
                </Text>
                    <View style={{borderBottomColor: '#85251a',
                        borderBottomWidth: 5,}}>
                    <Text style = {{
                        fontWeight: 'bold', 
                        fontSize: 25, 
                        textAlign: 'center',
                        color: 'white', 
                        backgroundColor: '#A62E20',
                        paddingBottom: 10,
                        paddingTop: 10,
                    }}>
                    To Learn More:
                    </Text></View>
                    <Text style = {{
                        fontSize: 20,
                        paddingBottom: 20,
                        paddingTop: 10,
                        textAlign: 'center',
                    }}>
                    Links:   
                </Text>
            </ScrollView>
        );
    }
}

export default AboutACHS;
