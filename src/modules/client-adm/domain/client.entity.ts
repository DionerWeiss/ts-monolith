import { AggregateRoot } from "../../@shared/domain/entity/aggregate-root.interface";
import { BaseEntity } from "../../@shared/domain/entity/base.entity";
import { Id } from "../../@shared/domain/value-object/id.value-object";

type ClientProps = {
  id?: Id;
  name: string;
  email: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Client extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _email: string;
  private _document: string;
  private _street: string;
  private _number: string;
  private _complement: string;
  private _city: string;
  private _zipCode: string;
  private _state: string;

  constructor(props: ClientProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._email = props.email;
    this._document = props.document;
    this._street = props.street;
    this._complement = props.complement;
    this._number = props.number;
    this._city = props.city;
    this._state = props.state;
    this._zipCode = props.zipCode;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get document(): string {
    return this._document;
  }

  get street(): string {
    return this._street;
  }

  get complement(): string {
    return this._complement;
  }

  get number(): string {
    return this._number;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  validate(): void {
    if (this._name === undefined) {
      throw new Error("Client must have a name");
    }
    if (this._email === undefined) {
      throw new Error("Client must have a email");
    }
    if (this._document === undefined) {
      throw new Error("Client must have a document");
    }
    if (this._street === undefined) {
      throw new Error("Client must have a street");
    }
    if (this._number === undefined) {
      throw new Error("Client must have a number");
    }
    if (this._complement === undefined) {
      throw new Error("Client must have a complement");
    }
    if (this._city === undefined) {
      throw new Error("Client must have a city");
    }
    if (this._state === undefined) {
      throw new Error("Client must have a state");
    }
    if (this._zipCode === undefined) {
      throw new Error("Client must have a ZipCode");
    }
  }
}