import {AuthService} from '../core/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import * as toastr from 'toastr';
import * as moment from 'moment';
import {Entity, RestApi} from '../services/hadith-house-api-base';

export abstract class EntityEditingComponent<TEntity extends Entity> {
  entityToDelete: TEntity = null;

  protected constructor(private entityApi: RestApi<TEntity>,
                        private entityClass: new(...params: any[]) => TEntity,
                        private authService: AuthService,
                        private permissionPostfix: string) {
  }

  /**
   * Ensures that the changes made to the entity are valid.
   * @param {TEntity} tag The entity to be validated.
   * @returns {boolean} True or false.
   */
  abstract validateEdits(entity: TEntity): boolean;

  addNew(): TEntity {
    const newEntity = new this.entityClass();
    newEntity._isAddingNew = true;
    newEntity._isEditing = true;
    return newEntity;
  }

  /**
   * Starts editing an entity.
   * @param {TEntity} entity The entity to edit.
   */
  startEditing(entity: TEntity) {
    entity._copy = new this.entityClass();
    entity._copy.set(entity);
    entity._isEditing = true;
  }

  /**
   * Cancels editing of an entity and restore value.
   * @param {TEntity} entity The entity to cancel editing.
   */
  cancelEditing(entity: TEntity) {
    if (entity._isEditing) {
      entity.set(entity._copy);
      entity._isEditing = false;
      entity._copy = null;
    }
  }

  /**
   * Called when the user clicks on the save button to save the entity.
   * @param {TEntity} entity The entity to save.
   */
  finishEditing(entity: TEntity) {
    if (!entity._isAddingNew && entity.equals(entity._copy)) {
      entity._isEditing = false;
      entity._isAddingNew = false;
      return;
    }
    if (!this.validateEdits(entity)) {
      return;
    }

    if (entity._isAddingNew) {
      this.saveNewEntity(entity);
    } else if (entity._isEditing) {
      this.updateExistingEntity(entity);
    } else {
      throw new Error('Unreachable code.');
    }
  }

  /**
   * Called when the entity being saved is an existing entity.
   * @param {number} entity The index of the entity to be updated.
   */
  private updateExistingEntity(entity: TEntity) {
    if (entity._isAddingNew) {
      throw new Error('This method cannot be called for adding new entities.');
    }

    // Send the changes to the server.
    this.entityApi.put(entity).subscribe((updatedEntity) => {
      // Successfully saved changes. Don't need to do anything.
      entity._isEditing = false;
      entity._isAddingNew = false;
      toastr.success('Saved');
    }, (response: HttpErrorResponse) => {
      if (response.error.error) {
        toastr.error('Failed to add entity. Error was: ' +
          response.error.error);
      } else {
        toastr.error('Failed to save changes. Please try again.');
      }
    });
  }

  /**
   * Called when the entity being saved is a new entity.
   * @param {TEntity} entity The entity to be saved.
   */
  private saveNewEntity(entity: TEntity) {
    if (!entity._isAddingNew) {
      throw new Error(
        'This method cannot be called for updating existing entity.');
    }

    // Send the changes to the server.
    this.entityApi.post(entity).subscribe((addedEntity) => {
      // Successfully saved changes. Don't need to do anything.
      entity._isEditing = false;
      entity._isAddingNew = false;
      toastr.success('Saved');
    }, (response: HttpErrorResponse) => {
      if (response.error.error) {
        toastr.error('Failed to add entity. Error was: ' +
          response.error.error);
      } else {
        toastr.error('Failed to add entity. Please try again.');
      }
    });
  }

  /**
   * Called to display a dialog to confirm the request to delete an entity.
   * @param {TEntity} entity The entity to be delete.
   * @param dialog
   */
  showDeleteDialog(entity: TEntity, dialog: any) {
    if (!this.authService.loggedInUserHasPermission(
      'delete_' + this.permissionPostfix)) {
      throw new Error("The logged in user doesn't have permission to delete " +
        'entities, so this method should not have be called.');
    }
    this.entityToDelete = entity;
    dialog.show();
  }

  /**
   * Performs the actual deletion of the entity. This depends on an earlier call
   * to {@link showDeleteDialog}
   * @param dialog
   */
  deleteEntity(dialog: any) {
    dialog.hide();
    this.entityApi.delete(this.entityToDelete.id).subscribe(() => {
      toastr.success('Hadith tag deleted');
      this.entityToDelete = null;
    }, (result: HttpErrorResponse) => {
      if (result.error.error) {
        toastr.error('Failed to delete entity. Error was: ' +
          `${result.error.error}`);
      } else {
        toastr.error('Failed to delete entity. Please try again!');
      }
    });
  }

  /**
   * Determines whether the user has the permission to add entities.
   * @returns {boolean} True or false.
   */
  userHasAddPermission(): boolean {
    return this.authService.loggedInUserHasPermission(
      'add_' + this.permissionPostfix);
  }

  /**
   * Determines whether the user has the permission to edit entities.
   * @returns {boolean} True or false.
   */
  userHasEditPermission(): boolean {
    return this.authService.loggedInUserHasPermission(
      'change_' + this.permissionPostfix);
  }

  /**
   * Determines whether the user has the permission to delete entities.
   * @returns {boolean} True or false.
   */
  userHasDeletePermission(): boolean {
    return this.authService.loggedInUserHasPermission(
      'delete_' + this.permissionPostfix);
  }
}
