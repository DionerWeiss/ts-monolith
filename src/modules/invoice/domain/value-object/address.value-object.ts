import { ValueObject } from "../../../@shared/domain/value-object/value-object.interface";

type AddressProps = {
  street: string 
  number: string 
  zipCode: string 
  city: string 
  complement: string;
  state: string;
}

export class Address implements ValueObject {
  private _street: string = "";
  private _number: string = '0';
  private _zipCode: string = "";
  private _city: string = "";
  private _complement?: string = ""
  private _state: string = ""

  constructor(props: AddressProps) {
    this._street = props.street;
    this._number = props.number;
    this._zipCode = props.zipCode;
    this._city = props.city;
    this._complement = props.complement
    this._state = props.state

    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }
  get complement(): string {
    return this._complement;
  }
  
  validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }
    if (this._zipCode.length === 0) {
      throw new Error("zipCode is required");
    }
    if (this._city.length === 0) {
      throw new Error("City is required");
    }
    if (this._state.length === 0) {
      throw new Error("State is required");
    }
  }
}