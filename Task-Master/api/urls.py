from django.urls import path
from api.views.user import Users, UserMyself, UpdateUser, SearchUsers
from api.views.profile import Profile
from api.views.project import (
    AddProjectMembers, 
    CreateProject, 
    GetProjectMembers, 
    UserProjects, 
    UserProjectsByUsername,
    GetEligibleProjectMembers
)
from api.views.task import (
    CreateTask,
    ProjectTasks,
    SearchAssignedTasks,
    SearchProjectTasks,
    SearchConnectedTasks,
    GetConnectedTasks,
    TaskById,
    ToggleNudgeTask,
    UpdateTask,
    UserAssignedTasks,
    UserTasksByUsernameConnected
)
from api.views.connections import ( 
    CreateConnection,
    DeleteConnection,
    IsFollowing,
    ListConnections,
    ListFollowers,
    ListFollowing
)
from api.views.open_to_work import (
    CreateIsOpenToWork,
    ToggleOpenToWork,
    GetOpenToWorkState
)

BASE_API_URL = 'api'

urlpatterns = [
    path(f'{BASE_API_URL}/user/me', UserMyself.as_view()),
    path(f'{BASE_API_URL}/user/search/<str:search_term>', SearchUsers.as_view()),
    path(f'{BASE_API_URL}/users/<str:username>/profile', Profile.as_view()),
    path(f'{BASE_API_URL}/user/update', UpdateUser.as_view()),
    path(f'{BASE_API_URL}/project/create', CreateProject.as_view()),
    path(f'{BASE_API_URL}/project/<project_id>/members/add', AddProjectMembers.as_view()),
    path(f'{BASE_API_URL}/project/<project_id>/members/eligible-users', GetEligibleProjectMembers.as_view()),
    path(f'{BASE_API_URL}/project/<project_id>/members', GetProjectMembers.as_view()),
    path(f'{BASE_API_URL}/project/me', UserProjects.as_view()),
    path(f'{BASE_API_URL}/project/user/<str:username>', UserProjectsByUsername.as_view()),
    path(f'{BASE_API_URL}/project/<project_id>/tasks', ProjectTasks.as_view()),
    path(f'{BASE_API_URL}/project/<project_id>/tasks/search/<str:query>', SearchProjectTasks.as_view()),
    path(f'{BASE_API_URL}/task/create', CreateTask.as_view()),
    path(f'{BASE_API_URL}/task/update', UpdateTask.as_view()),
    path(f'{BASE_API_URL}/task/toggle-nudge', ToggleNudgeTask.as_view()),
    path(f'{BASE_API_URL}/task/<task_id>', TaskById.as_view()),
    path(f'{BASE_API_URL}/task/user/<str:username>', UserTasksByUsernameConnected.as_view()),
    path(f'{BASE_API_URL}/task/assigned/<str:username>', UserAssignedTasks.as_view()),
    path(f'{BASE_API_URL}/task/assigned/<str:username>/search/<str:query>', SearchAssignedTasks.as_view()),
    path(f'{BASE_API_URL}/task/connected/<str:username>', GetConnectedTasks.as_view()),
    path(f'{BASE_API_URL}/task/connected/<str:username>/search/<str:query>', SearchConnectedTasks.as_view()),
    path(f'{BASE_API_URL}/connection/follow', CreateConnection.as_view()),
    path(f'{BASE_API_URL}/connection/isfollowing', IsFollowing.as_view()),
    path(f'{BASE_API_URL}/connection/unfollow', DeleteConnection.as_view()),
    path(f'{BASE_API_URL}/connection/all', ListConnections.as_view()),
    path(f'{BASE_API_URL}/connection/followers/<str:username>', ListFollowers.as_view()),
    path(f'{BASE_API_URL}/connection/following/<str:username>', ListFollowing.as_view()),
    path(f'{BASE_API_URL}/profile/create/switch', CreateIsOpenToWork.as_view()),
    path(f'{BASE_API_URL}/profile/update/switch', ToggleOpenToWork.as_view()),
    path(f'{BASE_API_URL}/profile/switch/<str:username>', GetOpenToWorkState.as_view()),
]
