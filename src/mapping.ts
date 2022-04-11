import { BigInt } from "@graphprotocol/graph-ts"
import { Bytes } from "@graphprotocol/graph-ts"
import {
  Delegate,
  User
} from "../generated/schema"

import {
  Uni,
  DelegateChanged,
  DelegateVotesChanged,
  Transfer
} from "../generated/Uni/Uni"



export function handleDelegateChanged(event: DelegateChanged): void {
  let id = event.transaction.hash.toHex()
  let delegate = new Delegate(id)

  delegate.delegator = event.params.delegator
  delegate.fromDelegate = event.params.fromDelegate
  delegate.toDelegate = event.params.toDelegate
  delegate.save()
}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  let id = event.transaction.hash.toHex()
  let delegate = Delegate.load(id)
  if (delegate == null) {
    delegate = new Delegate(id)
  }
   
  delegate.previousBalance = event.params.previousBalance
  delegate.newBalance = event.params.newBalance
  delegate.save()
}

export function handleTransfer(event: Transfer): void {
  let id = event.transaction.hash.toHex()
  let user = new User(id)
  if (user == null) {
    user = new User(id)
  }
  user.to = event.params.to
  user.from = event.params.from
  user.amount = event.params.amount
  user.save()
}
