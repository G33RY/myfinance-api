import { getMetadataArgsStorage } from 'typeorm';
import { RequestContext } from '@/context/context.model';
import { UnauthorizedException } from '@nestjs/common';

export function getColumnMetadata(entity: Function, fieldName: string) {
  const columns = getMetadataArgsStorage().columns;
  return columns.find(
    (col) => col.target === entity && col.propertyName === fieldName
  );
}

export function currentUser() {
  return RequestContext.currentContext?.user
}

export function currentUserOrFail() {
  const user = RequestContext.currentContext?.user;
  if (!user) {
    throw new UnauthorizedException()
  }
  return user;
}
