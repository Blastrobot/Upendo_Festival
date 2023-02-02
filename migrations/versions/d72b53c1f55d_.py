"""empty message

Revision ID: d72b53c1f55d
Revises: d8b583663da8
Create Date: 2023-02-02 17:22:17.651949

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd72b53c1f55d'
down_revision = 'd8b583663da8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tickets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ticket_type', sa.String(length=128), nullable=False),
    sa.Column('ticket_price', sa.Integer(), nullable=False),
    sa.Column('ticket_desc', sa.String(length=256), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('ticket_type')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tickets')
    # ### end Alembic commands ###
