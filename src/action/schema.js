import { BinaryReader, BinaryWriter, deserializeUnchecked } from 'borsh';
import base58 from 'bs58';
import { PublicKey, SOLANA_SCHEMA } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';

class Assignable {
  constructor(properties) {
    Object.keys(properties).map((key) => {
      return (this[key] = properties[key]);
    });
  }
}

export class Data extends Assignable {}

export class DataV2 extends Assignable{}

export class Creator extends Assignable {}

export class Collection extends Assignable{}

export class Uses extends Assignable{}

export class CreateMetadataV2Args extends Assignable{}

export class CreateMetadataArgs extends Assignable{}

export class UpdateMetadataArgs extends Assignable{
  instruction = 1;
}

export class CreateMasterEditionArgs extends Assignable{
  instruction = 10;
}

export class CreateMasterEditionV3Args extends Assignable{}

export class Metadata extends Assignable{
}

export const METADATA_SCHEMA = new Map ([
  [
    CreateMetadataArgs,
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['data', DataV2],
        ['isMutable', 'u8'], // bool
      ],
    },
  ],
  [
    CreateMasterEditionArgs,
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['maxSupply', { kind: 'option', type: 'u64' }],
      ],
    },
  ],
  [
    UpdateMetadataArgs,
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['data', { kind: 'option', type: Data }],
        ['updateAuthority', { kind: 'option', type: 'pubkeyAsString' }],
        ['primarySaleHappened', { kind: 'option', type: 'u8' }],
      ],
    },
  ],
  [
    Data,
    {
      kind: 'struct',
      fields: [
        ['name', 'string'],
        ['symbol', 'string'],
        ['uri', 'string'],
        ['sellerFeeBasisPoints', 'u16'],
        ['creators', { kind: 'option', type: [Creator] }],
      ],
    },
  ],
  [
    DataV2,
    {
      kind: 'struct',
      fields: [
        ['name', 'string'],
        ['symbol', 'string'],
        ['url', 'string'],
        ['sellerFeeBasisPoints', 'u16'],
        ['creator', {kind: 'option', type:[Creator]}],
        ['collection', {kind:'option', type: Collection}],
        ['uses', {kind:'option', type: Uses}],
      ]
    }
  ],
  [
    Creator,
    {
      kind: 'struct',
      fields: [
        ['address', 'pubkeyAsString'],
        ['verified', 'u8'],
        ['share', 'u8'],
      ],
    },
  ],
  [
    Collection,
    {
      kind: 'struct',
      fields: [
        []
      ]
    }
  ],
  [
    Uses,
    {
      kind: 'struct',
      fields: [
        ['useMethod', 'u8'],
        ['total', 'u8'],
        ['remaining', 'u8']
      ]
    }
  ],
  [
    CreateMetadataV2Args,
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['data', {kind:'option', type: DataV2 }],
        ['isMutable', 'u8'] //boolean
      ]
    }
  ],
  [
    CreateMasterEditionV3Args,
    {
      kind: 'struct',
      fields: [
        [
          ['instruction', 'u8'],
          ['maxSupply', {kind: 'option', type:'bn'}]
        ]
      ]
    }
  ],
  [
    Metadata,
    {
      kind: 'struct',
      fields: [
        ['key', 'u8'],
        ['updateAuthority', 'pubkeyAsString'],
        ['mint', 'pubkeyAsString'],
        ['data', Data],
        ['primarySaleHappened', 'u8'], // bool
        ['isMutable', 'u8'], // bool
        ['editionNonce', { kind: 'option', type: 'u8' }],
      ],
    },
  ],
]);

// eslint-disable-next-line no-control-regex
const METADATA_REPLACE = new RegExp('\u0000', 'g');

export const decodeMetadata = (buffer) => {
  const metadata = deserializeUnchecked(
    METADATA_SCHEMA,
    Metadata,
    buffer,
  );
  metadata.data.name = metadata.data.name.replace(METADATA_REPLACE, '');
  metadata.data.uri = metadata.data.uri.replace(METADATA_REPLACE, '');
  metadata.data.symbol = metadata.data.symbol.replace(METADATA_REPLACE, '');
  return metadata;
};

export const extendBorsh = () => {
  (BinaryReader.prototype).readPubkey = function () {
    const reader = this;
    const array = reader.readFixedArray(32);
    return new PublicKey(array);
  };

  (BinaryWriter.prototype).writePubkey = function (value) {
    const writer = this;
    writer.writeFixedArray(value.toBuffer());
  };

  (BinaryReader.prototype).readPubkeyAsString = function () {
    const reader = this;
    const array = reader.readFixedArray(32);
    return base58.encode(array);
  };

  (BinaryWriter.prototype).writePubkeyAsString = function (
    value,
  ) {
    const writer = this ;
    writer.writeFixedArray(base58.decode(value));
  };
};

extendBorsh();
