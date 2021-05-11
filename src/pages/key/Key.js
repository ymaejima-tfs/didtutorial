import React from 'react';
import { useLiveQuery } from "dexie-react-hooks";
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-cobalt";

import { driver } from '@digitalbazaar/did-method-key';

import DB from "../../Db";
import {WalletContext} from "../../contexts/Wallet";

function KeyPane() {
  const wallet = React.useContext(WalletContext);
  const [newKeyName, setNewKeyName] = React.useState("");
  const [didDocument, setDidDocument] = React.useState("");

  const generateDid = async function(){
    if(newKeyName){
      const didKeyDriver = driver();
      const { didDocument, methodFor } = await didKeyDriver.generate();
      const assertionKeyPair = methodFor({purpose: 'assertionMethod'});
      DB.dids.put(
        {
          "name": newKeyName,
          "hasPrivKey": 1,
          "did": didDocument.id,
          "assertionKeyPair": assertionKeyPair,
          "diddoc": didDocument
        }
      )}
  };

  const deleteDid = async function(primaryKey){
    await DB.dids.delete(primaryKey);
  }

  const selectDid = async function(selectedRow){
    wallet.setCurrentKeyName(selectedRow.name);
    wallet.setCurrentKey(selectedRow.assertionKeyPair);
    setDidDocument(JSON.stringify(selectedRow.diddoc, null, 2));
    console.log(wallet.currentKeyName);
  }

  const dids = useLiveQuery( ()=>DB.dids.where("hasPrivKey").equals(1).toArray() );

  return (
    <div>
      <p> {wallet.currentKeyName} </p>
      <h1>Key preparation</h1>
      <h2>Chose a key you use</h2>
      <MaterialTable 
        title="Your DIDs"
        data={dids}
        columns={[
          { title: 'Name', field: 'name'},
          { title: 'Decentralized Identifier', field: 'did'},
        ]}
        actions={[
          { icon: 'save', tooltip: 'Use this DID', onClick: (e, row)=>selectDid(row) },
          { icon: 'delete', tooltip: 'Delete this DID', onClick: (e, row)=>deleteDid(row.name) }
        ]}
        options={{
          sorting: false
        }}
      />

      <h3>DID Document of the key you choosed</h3>
      <AceEditor
        mode={'json'}
        theme="cobalt"
        style={{ width: '100%' }}
        readOnly={true}
        wrapEnabled={true}
        minLines={20}
        maxLines={50}
        name="DID Document Representation"
        value={ didDocument } />

      <h2>Generate a new key</h2>
      <div>
        <TextField label="Key Name" onChange={(e)=>setNewKeyName(e.target.value)} />
        <Button variant="contained" color="primary" onClick={ generateDid }>
          Generate new key
        </Button>
      </div>
      <h2>Your key</h2>

      <h2>Save key</h2>
      <div>
        <Button variant="contained" color="primary">
          Save key
        </Button>
      </div>
    </div>
  );
}

export default KeyPane;
