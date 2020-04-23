const { React, getModule } = require('powercord/webpack');
const { TabBar, Switch } = require('powercord/components');
const CodeMirror = require('./CodeMirror');
const Base = require('./Base');

class Themes extends Base {
  constructor () {
    super();
    this.state.tab = 'INSTALLED';
  }

  render () {
    const { topPill, item } = getModule([ 'topPill' ], false);
    return (
      <>
        <div className='powercord-entities-manage-tabs'>
          <TabBar
            selectedItem={this.state.tab}
            onItemSelect={tab => this.setState({ tab })}
            type={topPill}
          >
            <TabBar.Item className={item} selectedItem={this.state.tab} id='INSTALLED'>Manage</TabBar.Item>
            <TabBar.Item className={item} selectedItem={this.state.tab} id='QUICK_CSS'>Quick CSS</TabBar.Item>
          </TabBar>
        </div>
        {this.state.tab === 'INSTALLED' ? super.render() : this.renderQuickCSS()}
        {this.getItems().forEach(item => this.renderItem(item))}
      </>
    );
  }

  renderQuickCSS () {
    return (
      <div className='powercord-quickcss'>
        <div className='powercord-quickcss-header'></div>
        <CodeMirror onReady={this.setupCodeMirror.bind(this)}/>
        <div className='powercord-quickcss-footer'></div>
      </div>
    );
  }

  // eslint-disable-next-line no-unused-vars
  renderItem (item) {
    console.log(item)
    return (
      <div style={{backgroundColor: "rgba(0,0,0,.1)", padding: "20px", borderColor: "rgba(0,0,0,.1)", borderWidth: "2px", borderRadius: "20px", height: "200px"}}>
        <p style={{fontSize: "22px", position: "relative", top: "-15px", textDecoration: "bold"}}>{item.manifest.name}</p>
        <p>Author: {item.manifest.author}</p>
        <p>Version: {item.manifest.version}</p>
        <p>Description: {item.manifest.description}</p>
        <p>License: {item.manifest.license}</p>
        <Switch style={{position: "relative", left: "90%", bottom: "170px"}}value={item.applied} onChange={item.applied ? () => powercord.styleManager.disable(item.entityID) : () => powercord.styleManager.enable(item.entityID)}/>
      </div>
    )
  }

  getItems () {
    return this._sortItems([ ...powercord.styleManager.themes.values() ].filter(t => t.isTheme));
  }

  setupCodeMirror (cm) {
    console.log(cm);
  }
}

module.exports = Themes;